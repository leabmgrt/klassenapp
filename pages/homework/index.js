import { useState, useEffect } from "react";
import axios from "axios";
import HomeCard from "../../components/HomeCard";
import homework from "../api/homework";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/Calendar.module.css";
import { get as getCookie } from "es-cookie";
import MainPage from "../../components/MainPage";

export default function Homework({ initFromTabbar }) {
	const router = useRouter();
	const [homeworkData, setHomeworkData] = useState(null);
	useEffect(() => {
		if (initFromTabbar != true) router.push("/?p=1");
		const sessionToken = getCookie("token");
		if (sessionToken == undefined) router.push("/login");
		axios
			.get("/api/homework", {
				headers: {
					Authorization: sessionToken,
				},
			})
			.then(({ data }) => {
				setHomeworkData(data);
			})
			.catch((error) => {
				if (error.response.status === 401) {
					router.push("/login");
				} else {
					alert(error);
				}
			});
	}, []);
	return (
		<MainPage>
			<div>
				{initFromTabbar ? (
					<div>
						{homeworkData != null ? (
							homeworkData.homework.length > 0 ? (
								homeworkData.homework.map((homework) => (
									<Link
										key={homework.id}
										href={`/homework/${homework.id}?return=/homework`}
									>
										<a>
											<HomeCard key={homework.id} title={homework.lesson}>
												<p className={styles.eventSubtitle}>
													Zu erledigen bis: {homework.due}
												</p>
											</HomeCard>
										</a>
									</Link>
								))
							) : (
								<p>Keine Hausaufgaben 🎉</p>
							)
						) : (
							<p>Wird geladen...</p>
						)}
					</div>
				) : (
					<p></p>
				)}
			</div>
		</MainPage>
	);
}
