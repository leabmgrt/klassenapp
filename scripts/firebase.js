/*const admin = require("firebase-admin");
require("dotenv").config();

try {
	admin.initializeApp({
		credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_JSON)),
	});
} catch {
	console.error("Firebase initializion error");
}

const firebase = admin;
export default firebase;
*/

import fb from "firebase";

const firebaseConfig = {
	apiKey: process.env.FB_APIKEY,
	authDomain: process.env.FB_AUTHDOMAIN,
	databaseURL: process.env.FB_DBURL,
	projectId: process.env.FB_PROJECTID,
	storageBucket: process.env.FB_STORAGEBUCKET,
	messagingSenderId: process.env.FB_MESSAGINGSENDERID,
	appId: process.env.FB_APPID,
	measurementId: process.env.FB_MEASUREMENTID,
};
try {
	fb.initializeApp(firebaseConfig);
} catch (err) {
	if (!/already exists/.test(err.message)) {
		console.error("Firebase initialization error", err.stack);
	}
}
const firebase = fb;
export default firebase;
