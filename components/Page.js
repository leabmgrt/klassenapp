import styles from "../styles/Page.module.css";

export default function Page({ title, subtitle, children }) {
	return (
		<div className={styles.root}>
			<h1>{title}</h1>
			{subtitle != null ? <h3>{subtitle}</h3> : <div></div>}
			<hr className="solid" />
			{children}
		</div>
	);
}
