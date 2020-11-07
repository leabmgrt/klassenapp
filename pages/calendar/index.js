import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import HomeCard from "../../components/HomeCard";
import Link from "next/link";
import styles from "../../styles/Calendar.module.css";
import { get as getCookie } from "es-cookie";
import MainPage from "../../components/MainPage";
import moment from "moment";

export default function Calendar({ initFromTabbar }) {
	const router = useRouter();
	const [calendarData, setcalendarData] = useState(null);

	useEffect(() => {
		console.log(initFromTabbar)
		if (initFromTabbar != true) router.push("/?p=2");
		const sessionToken = getCookie("token");
		if (sessionToken == undefined) router.push("/login");
		axios
			.get("https://klassenapi.abmgrt.dev/class/calendar", {
				headers: {
					Authorization: sessionToken,
				},
			})
			.then(({ data }) => {
				data.sort((a, b) => parseFloat(moment(a.startdate).valueOf()) - parseFloat(moment(b.startdate).valueOf()));
				setcalendarData(data);
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
						{calendarData != null ? (
							calendarData.length > 0 ? (
								calendarData.map((event) => (
									<Link
										key={event.id}
										href={`/calendar/${event.id}?return=/calendar`}
									>
										<a>
											<HomeCard key={event.id} title={event.name}>
												{event.hasOwnProperty("enddate") &&
												event.enddate != null ? (
													<p className={styles.eventSubtitle}>
														{moment(event.startdate).format("DD.MM.YYYY HH:mm")} - {moment(event.enddate).format("DD.MM.YYYY HH:mm")}
													</p>
												) : (
													<p className={styles.eventSubtitle}>
														{moment(event.startdate).format("DD.MM.YYYY HH:mm")}
													</p>
												)}
											</HomeCard>
										</a>
									</Link>
								))
							) : (
								<p>Keine Einträge 😕</p>
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
