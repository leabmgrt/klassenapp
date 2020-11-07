import MainPage from "../../components/MainPage";
import { useRouter } from "next/router";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import Page from "../../components/Page";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../styles/Privacy.module.scss";

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

export default function LegalDisclosure() {
	const classes = useStyles();
	const router = useRouter();
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
								router.push("/settings");
							}}
						>
							<ArrowBackIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							<p>Impressum</p>
						</Typography>
					</Toolbar>
				</AppBar>
				<Toolbar />
				<div className={styles.mainFrame}>
					<h1>Impressum</h1>
					<h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
					<p>
						Adrian Baumgart
						<br />
						Karl-Gehrig-Stra&szlig;e 2<br />
						69226 Nu&szlig;loch
					</p>
					<h2>Kontakt</h2>
					<p>
						Telefon:{" "}
						<a
							className={styles.link}
							href="tel:+4915165909306"
							target="_blank"
						>
							+4915165909306
						</a>
						<br />
						E-Mail:{" "}
						<a
							className={styles.link}
							href="mailto:adrian@abmgrt.dev"
							target="_blank"
						>
							adrian@abmgrt.dev
						</a>
						<br />
						Internetadresse:{" "}
						<a
							className={styles.link}
							href="https://klassenapp.abmgrt.dev"
							target="_blank"
						>
							https://klassenapp.abmgrt.dev
						</a>
					</p>
					<h2>Verantwortlich f&uuml;r den Inhalt nach &sect; 55 Abs. 2 RStV</h2>
					<p>Adrian Baumgart</p>
					<h3>Haftung f&uuml;r Inhalte</h3>{" "}
					<p>
						Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs.1 TMG
						f&uuml;r eigene Inhalte auf diesen Seiten nach den allgemeinen
						Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 TMG sind wir als
						Diensteanbieter jedoch nicht verpflichtet, &uuml;bermittelte oder
						gespeicherte fremde Informationen zu &uuml;berwachen oder nach
						Umst&auml;nden zu forschen, die auf eine rechtswidrige
						T&auml;tigkeit hinweisen.
					</p>{" "}
					<p>
						Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
						Informationen nach den allgemeinen Gesetzen bleiben hiervon
						unber&uuml;hrt. Eine diesbez&uuml;gliche Haftung ist jedoch erst ab
						dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
						m&ouml;glich. Bei Bekanntwerden von entsprechenden
						Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
					</p>{" "}
					<h3>Haftung f&uuml;r Links</h3>{" "}
					<p>
						Unser Angebot enth&auml;lt Links zu externen Websites Dritter, auf
						deren Inhalte wir keinen Einfluss haben. Deshalb k&ouml;nnen wir
						f&uuml;r diese fremden Inhalte auch keine Gew&auml;hr
						&uuml;bernehmen. F&uuml;r die Inhalte der verlinkten Seiten ist
						stets der jeweilige Anbieter oder Betreiber der Seiten
						verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
						Verlinkung auf m&ouml;gliche Rechtsverst&ouml;&szlig;e
						&uuml;berpr&uuml;ft. Rechtswidrige Inhalte waren zum Zeitpunkt der
						Verlinkung nicht erkennbar.
					</p>{" "}
					<p>
						Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist
						jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
						zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
						derartige Links umgehend entfernen.
					</p>{" "}
					<h3>Urheberrecht</h3>{" "}
					<p>
						Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
						diesen Seiten unterliegen dem deutschen Urheberrecht. Die
						Vervielf&auml;ltigung, Bearbeitung, Verbreitung und jede Art der
						Verwertung au&szlig;erhalb der Grenzen des Urheberrechtes
						bed&uuml;rfen der schriftlichen Zustimmung des jeweiligen Autors
						bzw. Erstellers. Downloads und Kopien dieser Seite sind nur f&uuml;r
						den privaten, nicht kommerziellen Gebrauch gestattet.
					</p>{" "}
					<p>
						Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
						wurden, werden die Urheberrechte Dritter beachtet. Insbesondere
						werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
						trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten
						wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
						Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
					</p>
					<p>
						Quelle:{" "}
						<a href="https://www.e-recht24.de">https://www.e-recht24.de</a>
					</p>
				</div>
			</div>
		</MainPage>
	);
}
