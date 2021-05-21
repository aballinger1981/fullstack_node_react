import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieSession from 'cookie-session';
import './models/User';
import './models/Survey';
import './services/passport';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes';
import selectedKeys from './config/keys';
import billingRoutes from './routes/billingRoutes';
import surveyRoutes from './routes/surveyRoutes';

(async () => {
  const keys = await selectedKeys();

  mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({
    extended: true,
  }));
  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey],
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  authRoutes(app);
  billingRoutes(app);
  surveyRoutes(app);

  if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line no-underscore-dangle
    const __dirname = dirname(fileURLToPath(import.meta.url));
    // Express will serve up production assets like our main.js or main.css file
    app.use(express.static(resolve(__dirname, './client/build')));
    // Express will serve up the index.html file if it doesn't recognize the route
    // eslint-disable-next-line global-require
    app.get('*', (req, res) => {
      console.log('return html: ', resolve(__dirname, './client/build', 'index.html'));
      res.sendFile(resolve(__dirname, './client/build', 'index.html'));
    });
  }

  const PORT = process.env.PORT || 5000;
  app.listen(PORT);
})();
