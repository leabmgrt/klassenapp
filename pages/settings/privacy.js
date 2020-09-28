import MainPage from "../../components/MainPage";
import { useRouter } from "next/router";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import Page from "../../components/Page";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../styles/Privacy.module.css";

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

export default function PrivacyPolicy() {
	const classes = useStyles();
	const router = useRouter();
	return (
		<MainPage>
			<div>
				<AppBar position="fixed" color="inherit">
					<Toolbar>
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="menu"
							onClick={() => {
								router.push("/settings");
							}}
						>
							<ArrowBackIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							<p>Datenschutzerklärung</p>
						</Typography>
					</Toolbar>
				</AppBar>
				<Toolbar />
				<div className={styles.mainFrame}>
					<h4>Datenschutzerklärung</h4>
					<p></p>
					<i>
						Zuletzt aktualisiert am: <b>28.09.2020</b>
					</i>
					<p>
						Hi! Danke dass du die App verwendest. Ich versuch die
						Datenschutzerklärung kurz zu halten, keiner will ja tausend Seiten
						durchlesen ;) (aber ich will auch rechtlich abgesichert sein...)
					</p>
					<p>
						Ich (Adrian Baumgart) stelle diese Website (vonhieran: "App") als
						kostenlosen und Open-Source Dienst so wie er ist bereit (der
						Quellcode ist auf GitHub). Um die App anbieten zu können, muss ich
						einige Informationen sammeln. In dieser Datenschutzerklärung liste
						ich auf, welche Daten das sind.
					</p>
					<p>
						Wenn du die App verwendest, stimmst du du zu, dass du diese
						Datenschutzerklärung gelesen hast und einverstanden bist. Solltest
						du diese Datenschutzerklärung nicht akzeptieren, verwende die App{" "}
						<u>NICHT!</u>
					</p>
					<strong>Allgemeine (personenbezogene Informationen)</strong>
					<p>
						Um diese App zu ermöglichen und einen besseren Service anzubieten,
						sammle ich einige personenbezogene Daten. Einige Daten bleiben auf
						deinem Gerät, einige werden hochgeladen.
					</p>
					<p>
						Die App verwendet Firebase als Datenbank. Es ist möglich, dass
						Firebase auch personenbezogene Daten erfasst.{" "}
						<a
							className={styles.link}
							href="https://www.google.com/policies/privacy/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Hier ist ein Link zu Firebases Datenschutzerklärung
						</a>
					</p>
					<p>
						Diese App wird via Vercel bereitgestellt. Vercel Inc. könnte auch
						Daten sammeln.{" "}
						<a
							className={styles.link}
							href="https://vercel.com/legal/privacy-policy"
							target="_blank"
							rel="noopener noreferrer"
						>
							Vercels Datenschutzerklärung
						</a>
					</p>
					<strong>Protokolldaten</strong>
					<p>
						Ich enthalte mir das Recht vor, Daten und Informationen für ein
						Protokoll zu sammeln. Ich verwende diese Daten nicht, um Benutzer zu
						tracken. Diese Daten enthalten, sind aber nicht beschränk auf:
					</p>
					<ul>
						<li>IP-Adresse</li>
						<li>Gerätename</li>
						<li>Gerätetyp</li>
						<li>Betriebssystemversion</li>
						<li>Konfiguration der App</li>
						<li>Zeit und Datum</li>
					</ul>
					<strong>Cookies</strong>
					<p>
						Cookies sind kleine Daten, die im Browser gespeichert werden. Diese
						App verwendet Cookies, um den Benutzer angemeldet zu lassen (Später
						dazu mehr).
					</p>
					<p>
						Zudem können Drittanbieter auch Cookies zum Nutzungsverhalten
						speichern.
					</p>
					<strong>Sicherheit</strong>
					<p>
						Die Sicherheit deiner Daten ist mir sehr wichtig. Deswegen sammle
						ich auch so wenig Daten wir möglich. Aber denke daran, dass Daten,
						die über das Internet versendet werden, nie 100% sicher sind. Ich
						kann keine absolute Sicherheit garantieren.
					</p>
					<strong>Links zu anderen Websites</strong>
					<p>
						Die App enthält möglicherweise Links zu anderen Websites. Wenn du
						auf diese klickst, wirst du zu dieser Website weitergeleitet. Wir
						sind für Websites außerhalb von https://klassenapp.abmgrt.dev nicht
						zuständig und haben keine Kontroller über deren Inhalt. Ich
						empfehle, deren Datenschutzerklärung auch zu lesen. Solltest du
						einen "schlechten" Link zu einer Website finden, kannst du uns dies
						gerne melden
					</p>
					<strong>Anmeldeprozess</strong>
					<p>
						Während der Anmeldung gleicht die App den eingegebenen Pin mit dem
						gespeicherten Wert ab. Wenn dieser übereinstimmt, dann wird eine
						zufällige Zeichenfolge generiert (Beispiel:{" "}
						<i>a09a9d0b-e3e5-4849-b105-44c51c7fbb89</i>). Dieser Code wird dann
						verschlüsselt als Cookie gespeichert, damit du angemeldet bleibst.
						Zudem werden folgende Daten in der Datenbank gespeichert:
					</p>
					<ul>
						<li>Der Code</li>
						<li>Appumgebung ("development" oder "production")</li>
						<li>IP-Adresse</li>
					</ul>
					<p>
						Wir verwenden diesen Code um sicherzustellen, dass niemand anderes
						auf die Daten zugreifen kann. Sollte der Code fehlen oder nicht
						gültig sein, wirst du automatisch abgemeldet.
					</p>
					<p>
						Wenn du dich in den Einstellungen der App abmeldest, werden alle
						Daten für diesen Code gelöscht (auch aus der Datenbank).
					</p>
					<strong>Änderungen der Datenschutzerklärung</strong>
					<p>
						Ich behalte mir das Recht vor, diese Datenschutzerklärung jederzeit
						zu aktualisieren/anzupassen. Ich empfehle, die Datenschutzerklärung
						von Zeit zu Zeit zu überprüfen. Anhand des Datum oben kannst du
						erkennen, wann diese Datenschutzerklärung aktualisiert wurde.
					</p>
					<strong>Kontakt</strong>
					<p>
						Solltest zu Fragen haben kannst du mich hier gerne kontaktieren:
					</p>
					<ul>
						<li>
							Email:{" "}
							<a
								className={styles.link}
								href="mailto:adrian@abmgrt.dev"
								target="_blank"
							>
								adrian@abmgrt.dev
							</a>
						</li>
						<li>
							Telefon:{" "}
							<a
								className={styles.link}
								href="tel:+4915165909306"
								target="_blank"
							>
								+4915165909306
							</a>
						</li>
					</ul>
				</div>
			</div>
		</MainPage>
	);
}
