const axios = require("axios").default;

export default async (authorization) => {
	if (typeof authorization !== "string") return false;

	try {
		const url =
			process.env.NEXT_URL === undefined
				? "/api/auth"
				: `${process.env.NEXT_URL}/api/auth`;
		const response = await axios.post(url, {
			token: authorization,
		});
		return response.data.hasOwnProperty("session");
	} catch (err) {
		console.log(err);
		return false;
	}
};
