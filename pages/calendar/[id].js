import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";
import axios from "axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import styles from "../../styles/homework/HomeworkDetail.module.scss";
import addLineBreaks from "../../scripts/addLineBreaks";
import { get as getCookie } from "es-cookie";
import MainPage from "../../components/MainPage";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export default function CalendarDetail({ id, returnPath }) {
	const classes = useStyles();
	const router = useRouter();
	const [calendarData, setCalendarData] = useState(null);

	useEffect(() => {
		const sessionToken = getCookie("token");
		if (sessionToken == undefined) router.push("/login");
		axios
			.get(`https://klassenapi.abmgrt.dev/calendar/${id}`, {
				headers: {
					Authorization: sessionToken,
				},
			})
			.then(({ data }) => {
				setCalendarData(data);
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
				<AppBar position="fixed" color="inherit" className={styles.appbar}>
					<Toolbar>
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="menu"
							onClick={() => {
								if (returnPath != null) {
									router.push(returnPath);
								} else {
									router.push("/");
								}
							}}
						>
							<ArrowBackIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							{calendarData != null ? (
								<p>{calendarData.name}</p>
							) : (
								<p>Wird geladen...</p>
							)}
						</Typography>
					</Toolbar>
				</AppBar>
				<Toolbar />
				<div className={styles.mainFrame}>
					{calendarData != null ? (
						<div>
							<h3>
								Datum:{" "}
								{calendarData.hasOwnProperty("enddate") &&
								calendarData.enddate != null ? (
									<b>
										{moment(calendarData.startdate).format("DD.MM.YYYY HH:mm")} - {moment(calendarData.enddate).format("DD.MM.YYYY HH:mm")}
									</b>
								) : (
									<b>{moment(calendarData.startdate).format("DD.MM.YYYY HH:mm")}</b>
								)}
							</h3>
							<div className={styles.description}>
								{addLineBreaks(calendarData.description)}
							</div>
						</div>
					) : (
						<p>Wird geladen...</p>
					)}
				</div>
			</div>
		</MainPage>
	);
}

CalendarDetail.getInitialProps = async (ctx) => {
	if (ctx.query.hasOwnProperty("return"))
		return {
			id: ctx.query.id,
			returnPath: ctx.query.return,
		};
	return {
		id: ctx.query.id,
		returnPath: null,
	};
};
