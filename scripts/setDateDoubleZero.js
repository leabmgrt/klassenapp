export default (text) => {
	if (!isNaN(text) && parseInt(text) < 10) {
		return `0${text}`;
	}
	return text;
};
