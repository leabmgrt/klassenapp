import firebase from "../../../scripts/firebase";
import formatDateToString from "../../../scripts/formatDateToString";
import isValidAuth from "../../../scripts/isValidAuth";

export default async (req, res) => {
	const authorized = await isValidAuth(req.headers.authorization);
	if (!authorized) return res.status(401).json({ err: "badAuthorization" });
	
	const snapshot = await firebase.firestore().collection("calendar").get();
	var events = [];
	snapshot.forEach((doc) => {
		if (
			(doc.data().dates.hasOwnProperty("endDate") &&
				doc.data().dates.endDate.toMillis() < Date.now() - 86400000) ||
			doc.data().dates.startDate.toMillis() < Date.now() - 86400000
		) {
			return;
		}
		return events.push({
			id: doc.id,
			name: doc.data().name,
			startdate: formatDateToString(doc.data().dates.startDate.toDate()),
			enddate: doc.data().dates.hasOwnProperty("endDate")
				? formatDateToString(doc.data().dates.endDate.toDate())
				: null,
			sortdate: doc.data().dates.startDate.toMillis(),
		});
	});

	events.sort((a, b) => parseFloat(a.sortdate) - parseFloat(b.sortdate));

	res.status(200).json({
		events: events,
	});
};
