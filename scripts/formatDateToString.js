import setDateDoubleZero from "./setDateDoubleZero";

export default (date) => {
	return `${setDateDoubleZero(date.getDate())}.${setDateDoubleZero(
		date.getMonth() + 1
	)}.${date.getFullYear()} ${setDateDoubleZero(
		date.getHours()
	)}:${setDateDoubleZero(date.getMinutes())}`;
};
