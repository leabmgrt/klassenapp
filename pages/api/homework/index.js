import firebase from "../../../scripts/firebase";
import formatDateToString from "../../../scripts/formatDateToString";
import isValidAuth from "../../../scripts/isValidAuth";

export default async (req, res) => {
	const authorized = await isValidAuth(req.headers.authorization);
	if (!authorized) return res.status(401).json({ err: "badAuthorization" });

	const snapshot = await firebase.firestore().collection("homework").get();
	const homework = [];
	snapshot.forEach((doc) => {
		if (doc.data().due.toMillis() > Date.now() - 86400000) {
			var subhomework = "";
			doc.data().homework.forEach((hw) => {
				subhomework += `${hw.homework}\n`;
			});

			homework.push({
				id: doc.id,
				lesson: doc.data().lesson,
				due: formatDateToString(doc.data().due.toDate()),
				description: subhomework,
				sortdate: doc.data().due.toMillis(),
			});
		}
	});

	homework.sort((a, b) => parseFloat(a.sortdate) - parseFloat(b.sortdate));

	res.status(200).json({
		homework: homework /*[
			{
				id: "0001",
				lesson: "Deutsch",
				due: "morgen",
				description: "Test 01",
			},
		],*/,
	});
};
