import firebase from "../../../scripts/firebase";
import formatDateToString from "../../../scripts/formatDateToString";
import isValidAuth from "../../../scripts/isValidAuth";

export default async (req, res) => {
	const authorized = await isValidAuth(req.headers.authorization);
	if (!authorized) return res.status(401).json({ err: "badAuthorization" });

	const {
		query: { id },
	} = req;
	const snapshot = await firebase
		.firestore()
		.collection("homework")
		.doc(id)
		.get();

	var subhomework = "";
	snapshot.data().homework.forEach((hw) => {
		subhomework += `• ${hw.homework}\n\n\n`;
	});

	res.status(200).json({
		id: snapshot.id,
		lesson: snapshot.data().lesson,
		due: formatDateToString(snapshot.data().due.toDate()),
		description: subhomework,
		sortdate: snapshot.data().due.toMillis(),
	});
};
