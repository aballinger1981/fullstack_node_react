import { Path } from 'path-parser';
import { URL } from 'url';
import _ from 'lodash';
import mongoose from 'mongoose';
import requireLogin from '../middlewares/requireLogin';
import requireCredits from '../middlewares/requireCredits';
import surveyTemplate from '../services/emailTemplates/surveyTemplate';
import Mailer from '../services/Mailer';
import selectedKeys from '../config/keys';

const Survey = mongoose.model('surveys');

export default async (app) => {
  const keys = await selectedKeys();

  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false });
    console.log('found surveys', surveys);
    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/thanks/:choice', (req, res) => {
    res.send('Thanks for your feedback!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const parserObject = new Path('/api/surveys/:surveyId/thanks/:choice');
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = parserObject.test(new URL(url).pathname);
        return match ? { email, surveyId: match.surveyId, choice: match.choice } : null;
      })
      .compact() // Remove the undefined elements returned in map above
      .uniqWith((a, b) => a.email === b.email && a.surveyId === b.surveyId)
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email, responded: false },
          },
        }, {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date(),
        }).exec();
      })
      .value();
    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const {
      title, subject, body, recipients,
    } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    const mailer = new Mailer(survey, keys.fromEmail, keys.sendGridKey,
      surveyTemplate(survey, keys.redirectDomain));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (error) {
      res.status(422).send(error);
    }
  });
};
