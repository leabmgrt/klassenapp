import { useState, useEffect } from "react";
import axios from "axios";
import HomeCard from "../components/HomeCard";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { get as getCookie } from "es-cookie";
import MainPage from "../components/HomeCard";

export default function Home({ initFromTabbar }) {
	const router = useRouter();
	const [homeData, setData] = useState(null);
	useEffect(() => {
		if (initFromTabbar != true) router.push("/?p=0");
		const sessionToken = getCookie("token");
		if (sessionToken == undefined) router.push("/login");
		/*axios
			.get("/api/home")
			.then(({ data }) => {
				setData(data);
			})
			.catch((error) => {
				alert(error);
			});*/
	}, []);

	return (
		<MainPage>
			<div>
				{initFromTabbar ? (
					<div>
						<p>Coming soon :)</p>
					</div>
				) : (
					<p></p>
				)}
			</div>
		</MainPage>
	);

	/*return (
		<div>
			{homeData != null ? (
				<div>
					<h2>Hausaufgaben bis morgen</h2>
					{homeData.habm.length > 0 ? (
						homeData.habm.map((habm) => (
							<HomeCard key={habm.id} title={habm.lesson}>
								<p>{habm.description}</p>
							</HomeCard>
						))
					) : (
						<p>Keine Hausaufgaben bis morgen 🎉</p>
					)}
					<hr className="solid" />
					<h2>Als nächstes</h2>
					{homeData.nextevents.length > 0 ? (
						homeData.nextevents.map((event) => (
							<HomeCard key={event.id} title={event.name}>
								{event.hasOwnProperty("enddate") ? (
									<p className={styles.eventSubtitle}>
										{event.startdate} - {event.enddate}
									</p>
								) : (
									<p className={styles.eventSubtitle}>{event.startdate}</p>
								)}
							</HomeCard>
						))
					) : (
						<p>Keine Events</p>
					)}
					<hr className="solid" />
				</div>
			) : (
				<p>Wird geladen...</p>
			)}
		</div>
	);*/
}
