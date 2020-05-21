const functions = require('firebase-functions');
const admin = require('firebase-admin');

var serviceAccount = require("../serviceAccountKey.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://up-team-d241d.firebaseio.com/"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = admin.firestore();

