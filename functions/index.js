const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
admin.initializeApp();

const firebaseConfig = {
    apiKey: "AIzaSyA2FPyNJSN_2VN7tGYW3YrtS5JpzfJNqMc",
    authDomain: "socialape-13440.firebaseapp.com",
    databaseURL: "https://socialape-13440.firebaseio.com",
    projectId: "socialape-13440",
    storageBucket: "socialape-13440.appspot.com",
    messagingSenderId: "51136174000",
    appId: "1:51136174000:web:a9ad4dbd9224abcc95a875",
    measurementId: "G-SSVSJDRZVK"
};

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

app.get('/screams', (req, res) => {
    admin
        .firestore()
        .collection('screams')
        .orderBy('createdAt', 'desc')
        .get()
        .then(data => {
            let screams = [];
            data.forEach(doc => {
            screams.push({
                screamId: doc.id,
                body: doc.data().body,
                userHandle: doc.data().userHandle,
                createdAt: doc.data().createdAt 
            });
        });
        return res.json(screams);
    })
    .catch(err => console.error(err));
});

app.post('/scream', (req, res) => {
    const newScream = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString()
    };

    admin.firestore()
        .collection('screams')
        .add(newScream)
        .then(doc => {
            res.json({ message: `document ${doc.id} created successfully`});
        })
        .catch(err => {
            res.status(500).json({ error: 'something went wrong'});
            console.error(err);
        })
});

// https://baseUrl.com/api/

exports.api = functions.https.onRequest(app);
