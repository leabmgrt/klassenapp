import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { get as getCookie, remove as removeCookie } from "es-cookie";
import styles from "../../styles/Settings.module.css";
import Link from "next/link";
import axios from "axios";
import MainPage from "../../components/MainPage";

export default function Settings({ initFromTabbar }) {
	const router = useRouter();
	useEffect(() => {
		if (initFromTabbar != true) router.push("/?p=3");
		const sessionToken = getCookie("token");
		if (sessionToken == undefined) router.push("/login");
	}, []);
	return (
		<MainPage>
			<div>
				{initFromTabbar ? (
					<div>
						<p>
							<i>Ziemlich leer</i>
						</p>
						<div className={styles.footer}>
							<div
								className={styles.card}
								onClick={() => {
									const sessionToken = getCookie("token");
									axios
										.post("https://klassenapi.abmgrt.dev/session/delete", {}, {
											headers: {
												Authorization: sessionToken,
											},
										})
										.then((response) => {
											removeCookie("token");
											router.push("/login");
										})
										.catch((err) => {
											alert(err);
										});
								}}
							>
								<h4 style={{ color: "#ffffff" }}>Abmelden</h4>
							</div>
							<a
								className={styles.link}
								href="https://github.com/leabmgrt/klassenapp"
								target="_blank"
							>
								Source Code
							</a>
							<Link href="/settings/privacy">
								<a className={styles.link}>Datenschutzerklärung</a>
							</Link>
							<Link href="/settings/disclosure">
								<a className={styles.link}>Impressum</a>
							</Link>
							<p>© 2020, Adrian Baumgart. All rights reserved.</p>
						</div>
					</div>
				) : (
					<p></p>
				)}
			</div>
		</MainPage>
	);
}
