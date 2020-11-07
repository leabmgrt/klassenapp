import { useState, useEffect } from "react";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import styles from "../styles/Login.module.scss";
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
	const [allClasses, setAllClasses] = useState([]);
	const [selectedClass, setSelectedClass] = useState("");
	const [classFieldShowError, setclassFieldShowError] = useState(false);
	const [classFieldErrorMessage, setClassFieldErrorMessage] = useState("");

	useEffect(() => {
		checkExistingToken();
		loadAllClasses();
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

	function loadAllClasses() {
		axios.get("https://klassenapi.abmgrt.dev/classes")
		.then((classResponse) => {
			setAllClasses(classResponse.data);
		}).catch((classerr) => {
			//
		})
	}

	function handleSignIn() {
		setPinFieldShowError(false);
		setPinFieldErrorMessage("");
		setclassFieldShowError(false);
		setClassFieldErrorMessage("");
		if (enteredPin.trim().length === 0) {
			setPinFieldErrorMessage("");
			return setPinFieldShowError(true);
		}
		if (selectedClass.trim().length === 0) {
			setClassFieldErrorMessage("");
			return setclassFieldShowError(true)
		}

		axios
			.get("https://api.ipify.org?format=json")
			.then((ipresponse) => {
				axios
					.post("https://klassenapi.abmgrt.dev/login", {
						password: enteredPin,
						class: selectedClass,
						ipaddress: ipresponse.data.ip,
						environment: process.env.NODE_ENV
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
				<p>Bitte gib das Passwort und die Klasse ein, um fortzufahren</p>
				<TextField
					id="pin"
					label="Passwort"
					type="password"
					className={styles.textfield}
					value={enteredPin}
					onChange={(event) => {
						setEnteredPin(event.target.value);
					}}
					error={pinFieldShowError}
					helperText={pinFieldErrorMessage}
				/>

				<br />

				<FormControl className={styles.classformcontrol}>
				<InputLabel id="demo-simple-select-label">Klasse</InputLabel>
				<Select
				className={styles.selectObject}
				value={selectedClass}
				error={classFieldShowError}
				helperText={classFieldErrorMessage}
				onChange={(event) => {
					setSelectedClass(event.target.value);
				}}>
				{
					allClasses.map((singleClass) => (
					<MenuItem key={singleClass.id} value={singleClass.id}>{singleClass.class} ({singleClass.year} {singleClass.teacher})</MenuItem>
					))
				}
				</Select>
				</FormControl>

				<div className={styles.signInButtonDiv}>
					<Button variant="outlined" color="primary" onClick={handleSignIn}>
						Anmelden
					</Button>
				</div>
			</div>
		</MainPage>
	);
}
