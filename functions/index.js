const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./util/fbAuth');

const { getAllScreams, postOneScream } = require('./handlers/screams');
const { signup, login } = require('./handlers/users');

// screams routes
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);

// users routes
app.post('/signup', signup);
app.post('/login', login);

exports.api = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//    functions.logger.info("Hello logs!", {structuredData: true});
//    response.send("Hello from Firebase!");
// });

// exports.getScreams = functions.https.onRequest((req, res) => {
//     admin
//         .firestore()
//         .collection('screams')
//         .get()
//         .then((data) => {
//             let screams = [];
//             data.forEach((doc) => {
//                 screams.push(doc.data());
//             });
//             return res.json(screams);
//         })
//         .catch((err) => console.error(err));
// });

// exports.createScream = functions.https.onRequest((req, res) => {
//     if (req.method !== 'POST') {
//         return res.status(400).json({ error: 'Method not allowed' });
//     }
//     const newScream = {
//         body: req.body.body,
//         createdAt: admin.firestore.Timestamp.fromDate(new Date()),
//         userHandle: req.body.userHandle       
//     };

//     admin
//         .firestore()
//         .collection('screams')
//         .add(newScream)
//         .then((doc) => {
//             res.json({ message: `document ${doc.id} created successfully' `});
//         })
//         .catch((err) => {
//             res.status(500).json({ error: 'something went wrong' });
//             console.error(err);
//         });
// });





