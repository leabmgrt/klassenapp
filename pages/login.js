import { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import styles from "../styles/Login.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { get as getCookie, set as setCookie } from "es-cookie";
import isValidAuth from "../scripts/isValidAuth";
import MainPage from "../components/MainPage";

export default function Login() {
	const router = useRouter();

	const [pinFieldShowError, setPinFieldShowError] = useState(false);
	const [pinFieldErrorMessage, setPinFieldErrorMessage] = useState("");
	const [enteredPin, setEnteredPin] = useState("");

	useEffect(() => {
		checkExistingToken();
	}, []);

	async function checkExistingToken() {
		const sessionToken = getCookie("token");
		if (sessionToken != undefined) {
			const isValidAuthorization = await isValidAuth(sessionToken);
			if (isValidAuthorization) {
				router.push("/");
			}
		}
	}

	function handleSignIn() {
		setPinFieldShowError(false);
		setPinFieldErrorMessage("");
		if (enteredPin.trim().length === 0) {
			setPinFieldErrorMessage("");
			return setPinFieldShowError(true);
		}

		axios
			.get("https://api.ipify.org?format=json")
			.then((ipresponse) => {
				axios
					.post("/api/login", {
						password: enteredPin,
						clientip: ipresponse.data.ip,
					})
					.then((response) => {
						if (response.data.hasOwnProperty("session")) {
							setCookie("token", response.data.session, { expires: 365 });
							router.push("/");
						} else {
							setPinFieldErrorMessage("Der eingegebene Pin ist falsch");
							return setPinFieldShowError(true);
						}
					})
					.catch((err) => {
						setPinFieldErrorMessage("Der eingegebene Pin ist falsch");
						return setPinFieldShowError(true);
					});
			})
			.catch((iperr) => {
				setPinFieldErrorMessage(
					"Bei der API-Anfrage ist ein Fehler vorgetreten. Bitte versuche es erneut"
				);
				return setPinFieldShowError(true);
			});
	}

	return (
		<MainPage>
			<div className={styles.mainFrame}>
				<h1>KlassenApp</h1>
				<p>Bitte gib den Code ein, um fortzufahren</p>
				<TextField
					id="pin"
					label="Pin"
					value={enteredPin}
					onChange={(event) => {
						setEnteredPin(event.target.value);
					}}
					error={pinFieldShowError}
					helperText={pinFieldErrorMessage}
				/>
				<div className={styles.signInButtonDiv}>
					<Button variant="outlined" color="primary" onClick={handleSignIn}>
						Anmelden
					</Button>
				</div>
			</div>
		</MainPage>
	);
}
