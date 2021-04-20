import stripe from 'stripe';
import requireLogin from '../middlewares/requireLogin';
import selectedKeys from '../config/keys';

export default async (app) => {
  const keys = await selectedKeys();
  app.post('/api/stripe', requireLogin, async (req, res) => {
    await stripe(keys.stripeSecretKey).charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id,
    });
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
