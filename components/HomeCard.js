import styles from "../styles/HomeCard.module.css";

export default function HomeCard({ title, children }) {
	return (
		<div className={styles.main}>
			<h3>{title}</h3>
			{children}
		</div>
	);
}
