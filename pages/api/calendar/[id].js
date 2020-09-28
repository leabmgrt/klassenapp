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
		.collection("calendar")
		.doc(id)
		.get();

	if (snapshot.data() == undefined || snapshot.data() == null)
		return res.status(404).json({ err: "resourceNotFound" });
	return res.status(200).json({
		id: snapshot.id,
		name: snapshot.data().name,
		startdate: formatDateToString(snapshot.data().dates.startDate.toDate()),
		enddate: snapshot.data().dates.hasOwnProperty("endDate")
			? formatDateToString(snapshot.data().dates.endDate.toDate())
			: null,
		description: snapshot.data().description,
	});
};
