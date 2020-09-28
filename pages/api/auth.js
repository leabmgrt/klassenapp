const jwt = require("jsonwebtoken");
import firebase from "../../scripts/firebase";

export default async (req, res) => {
	if (typeof req.body.token !== "string")
		return res.status(400).json({ err: "badRequest" });

	let token;
	try {
		token = await jwt.verify(req.body.token, process.env.SESSION_JWT);
	} catch (err) {
		return res.status(404).json({ err: "invalidToken" });
	}

	const snapshot = await firebase
		.firestore()
		.collection("sessions")
		.doc(token.session)
		.get();
	if (
		snapshot.data() == undefined ||
		!snapshot.data().session ||
		snapshot.data().session !== token.session
	)
		return res.status(400).json({ err: "badAuthorization" });

	return res.status(200).json(snapshot.data());
};
