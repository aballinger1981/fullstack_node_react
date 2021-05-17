import sendGrid from '@sendgrid/mail';

class Mailer {
  constructor({
    subject, recipients,
  }, fromEmail, sendGridKey, content) {
    this.message = {
      to: recipients.map((recipient) => recipient.email),
      from: fromEmail,
      subject,
      html: content,
      tracking_settings: {
        click_tracking: {
          enable: true,
        },
        open_tracking: {
          enable: true,
        },
        subscription_tracking: {
          enable: true,
        },
      },
    };
    this.send = async () => {
      sendGrid.setApiKey(sendGridKey);
      await sendGrid.send(this.message);
    };
  }
}

export default Mailer;
