const axios = require("axios").default;

export default async (authorization) => {
	if (typeof authorization !== "string") return false;

	try {
		const url = `https://klassenapi.abmgrt.dev/session/${authorization}`
		const response = await axios.get(url);
		return response.data.hasOwnProperty("id");
	} catch (err) {
		console.log(err);
		return false;
	}
};
