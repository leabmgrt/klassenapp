import firebase from "../../scripts/firebase";
import isValidAuth from "../../scripts/isValidAuth";
const axios = require("axios").default;

export default async (req, res) => {
	const authorized = await isValidAuth(req.headers.authorization);
	if (!authorized) return res.status(401).json({ err: "badAuthorization" });

	axios
		.post(`${process.env.NEXT_URL}/api/auth`, {
			token: req.headers.authorization,
		})
		.then(async (response) => {
			firebase
				.firestore()
				.collection("sessions")
				.doc(response.data.session)
				.delete()
				.then(() => {
					res.status(200).json({});
				});
		})
		.catch((err) => {
			res.status(500).json({ err: "internalError" });
		});
};
