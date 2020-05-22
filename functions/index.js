const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express')

const app = express()

var serviceAccount = require("./serviceAccountKey.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://up-team-d241d.firebaseio.com/"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = admin.firestore();

app.get('/banks', (req, res) => {
  let banks = [];
  db.collection('Bank')
    .get()
    .then(docs => {
      docs.forEach(doc => {
        banks.push({
          name: doc.data().name,
          id: doc.id,
          person: doc.data().person,
          business: doc.data().business
        })
      })
      res.send(banks)
    })
})

app.get('/bank/:id', (req, res) => {
  const bankId = req.params.id;
  db.collection('Bank').doc(bankId)
    .get()
    .then(doc => {
      if(!doc.exists) {
        return res.status(404).json({message: 'Bank not found'})
      }
      let bank = doc.data()
      bank.id = doc.id
      res.send(bank)
    })
})

app.get('/search', (req, res) => {
  let {object, option, loanType, term} = req.query;
})

exports.api = functions.https.onRequest(app)