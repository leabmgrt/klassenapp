import { useState, useEffect } from "react";
import axios from "axios";
import HomeCard from "../../components/HomeCard";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../styles/Calendar.module.css";
import { get as getCookie } from "es-cookie";
import MainPage from "../../components/MainPage";
import moment from "moment";

export default function Homework({ initFromTabbar }) {
	const router = useRouter();
	const [homeworkData, setHomeworkData] = useState(null);
	useEffect(() => {
		console.log(initFromTabbar)
		if (initFromTabbar != true) {
			router.push("/?p=1");
		}
		else {
			const sessionToken = getCookie("token");
			if (sessionToken == undefined) {
				router.push("/login");
			}
			else {
				axios
			.get("https://klassenapi.abmgrt.dev/class/homework", {
				headers: {
					Authorization: sessionToken,
				},
			})
			.then(({ data }) => {
				data.sort((a, b) => parseFloat(moment(a.due).valueOf()) - parseFloat(moment(b.due).valueOf()));
				setHomeworkData(data);
			})
			.catch((error) => {
				if (error.response.status === 401) {
					router.push("/login");
				} else {
					alert(error);
				}
			});
			}
		}
	}, []);
	return (
		<MainPage>
			<div>
				{initFromTabbar ? (
					<div>
						{homeworkData != null ? (
							homeworkData.length > 0 ? (
								homeworkData.map((homework) => (
									<Link
										key={homework.id}
										href={`/homework/${homework.id}?return=/homework`}
									>
										<a>
											<HomeCard key={homework.id} title={homework.subjects[0].name}>
												<p className={styles.eventSubtitle}>
													Zu erledigen bis: {moment(homework.due).format("DD.MM.YYYY HH:mm")}
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
