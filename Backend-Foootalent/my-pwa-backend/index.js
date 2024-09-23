const express = require('express');
const bodyParser = require('body-parser');
const webPush = require('web-push');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const VAPID_PUBLIC_KEY = 'BAeWX7N_MJx-3QNtLbU55xXxlda9AVTjqcLGhbC6eoUU9GZFqVxzjyNusIME9k_2OWp4IXbYMnlJlxzD0r5shlw'; 
const VAPID_PRIVATE_KEY = '5neHDMYL7FWFx8tR8uHFp0EiPxxEvloeaEUQrjc08O0';

webPush.setVapidDetails(
  'mailto:your-email@example.com',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    subscriptions.push(subscription);
    console.log('Received subscription:', subscription);
    res.status(201).json({});
  });
  
app.post('/sendNotification', (req, res) => {
  const notificationPayload = {
    notification: {
      title: 'New Notification!',
      body: 'This is a custom notification from the server.',
      icon: 'assets/icons/icon-96x96.png',
      actions: [
        { action: 'open', title: 'Open App' },
        { action: 'dismiss', title: 'Dismiss' },
      ],
      data: {
        url: 'https://your-app-url.com',
      },
    },
  };

  const promises = [];
  subscriptions.forEach((subscription) => {
    promises.push(
      webPush.sendNotification(subscription, JSON.stringify(notificationPayload))
    );
  });

  Promise.all(promises)
    .then(() => res.status(200).json({ message: 'Notifications sent' }))
    .catch((err) => {
      console.error('Error sending notification', err);
      res.sendStatus(500);
    });
});



let subscriptions = [];

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
