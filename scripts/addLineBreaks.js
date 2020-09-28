export default (string) =>
	string.split("\\n").map((text, index) => {
		return (
			<div key={`${text}-${index}`}>
				{text}
				<br />
			</div>
		);
	});
