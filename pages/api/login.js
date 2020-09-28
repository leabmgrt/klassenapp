const argon2 = require("argon2");
const uuid = require("uuid").v4;
import firebase from "../../scripts/firebase";
const jwt = require("jsonwebtoken");

export default async (req, res) => {
	if (
		typeof req.body.password !== "string" ||
		typeof req.body.clientip !== "string"
	)
		return res.status(400).json({ err: "badRequest" });
	try {
		if (
			await argon2.verify(
				process.env.PWD_HASH.includes("∑")
					? process.env.PWD_HASH.replace(/∑/g, "$")
					: process.env.PWD_HASH,
				req.body.password
			)
		) {
			const sessionUID = uuid();
			await firebase.firestore().collection("sessions").doc(sessionUID).set({
				session: sessionUID,
				environment: process.env.NODE_ENV,
				ip: req.body.clientip,
			});

			const token = jwt.sign(
				{
					session: sessionUID,
				},
				process.env.SESSION_JWT
			);

			res.status(200).json({ session: token });
		} else {
			res.status(401).json({ err: "wrongPassword" });
		}
	} catch (error) {
		res.status(500).json({ err: "internalError" });
	}
};
