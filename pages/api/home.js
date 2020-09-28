export default (req, res) => {
	res.status(200).json({
		habm: [
			{
				id: "0000",
				lesson: "NwT",
				due: "d0000",
				description: "Test 00",
			},
			{
				id: "0001",
				lesson: "Deutsch",
				due: "d0001",
				description: "Test 01",
			},
		],
		nextevents: [
			{
				id: "0000",
				name: "Feiertag",
				startdate: "sd0000",
				enddate: "ed0000",
			},
			{
				id: "0001",
				name: "Hey",
				startdate: "sd0000",
			},
		],
	});
};
