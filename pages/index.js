import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import Head from "next/head";
import styles from "../styles/Navigation.module.css";
import HomeIcon from "@material-ui/icons/Home";
import BookIcon from "@material-ui/icons/Book";
import TodayIcon from "@material-ui/icons/Today";
import SettingsIcon from "@material-ui/icons/Settings";
import Home from "./home";
import Homework from "./homework/index";
import Calendar from "./calendar/index";
import Settings from "./settings/index";
import Page from "../components/Page";
import { useState, useEffect } from "react";
import setDateDoubleZero from "../scripts/setDateDoubleZero";
import MainPage from "../components/MainPage";

const pages = {
	0: {
		name: "Home",
		path: "/home",
	},
	1: {
		name: "Hausaufgaben",
		path: "/homework",
	},
	2: {
		name: "Kalender",
		path: "/calendar",
	},
	3: {
		name: "Einstellungen",
		path: "/settings",
	},
};

const weekdays = {
	0: "Sonntag",
	1: "Montag",
	2: "Dienstag",
	3: "Mittwoch",
	4: "Donnerstag",
	5: "Freitag",
	6: "Samstag",
};

export default function NavigationManager({ selection, p }) {
	const [tabSelection, setTabSelection] = useState(selection);
	useEffect(() => {
		if (p != null) {
			window.history.pushState("", pages[`${p}`].name, pages[`${p}`].path);
		} else {
			window.history.pushState("", pages[`0`].name, pages[`0`].path);
		}
	}, []);

	const currentDate = new Date();

	let greeting = "";
	var currentHour = currentDate.getHours();

	if (currentHour < 12) {
		greeting = "Guten Morgen!";
	} else if (currentHour < 13) {
		greeting = "Guten Mittag!";
	} else if (currentHour < 18) {
		greeting = "Guten Nachmittag!";
	} else {
		greeting = "Guten Abend!";
	}

	const dateString = `Heute ist ${
		weekdays[currentDate.getDay()]
	}, der ${setDateDoubleZero(currentDate.getDate())}.${setDateDoubleZero(
		currentDate.getMonth() + 1
	)}.`;
	return (
		<MainPage>
			<div>
				<div className={styles.mainFrame}>
					{tabSelection == 0 ? (
						<Page title={greeting} subtitle={dateString}>
							<Home initFromTabbar={true} />
						</Page>
					) : tabSelection == 1 ? (
						<Page title={"Hausaufgaben"}>
							<Homework initFromTabbar={true} />
						</Page>
					) : tabSelection == 2 ? (
						<Page title={"Kalender"}>
							<Calendar initFromTabbar={true} />
						</Page>
					) : tabSelection == 3 ? (
						<Page title={"Einstellungen"}>
							<Settings initFromTabbar={true} />
						</Page>
					) : (
						<Page title={"Guten Morgen!"}>
							<Home initFromTabbar={true} />
						</Page>
					)}
				</div>

				<BottomNavigation
					value={tabSelection}
					onChange={(event, newValue) => {
						window.history.pushState(
							"",
							pages[`${newValue}`].name,
							pages[`${newValue}`].path
						);
						setTabSelection(newValue);
					}}
					className={styles.bottomNavigation}
				>
					<BottomNavigationAction label="Home" icon={<HomeIcon />} />
					<BottomNavigationAction label="Hausaufgaben" icon={<BookIcon />} />
					<BottomNavigationAction label="Kalender" icon={<TodayIcon />} />
					<BottomNavigationAction
						label="Einstellungen"
						icon={<SettingsIcon />}
					/>
				</BottomNavigation>
			</div>
		</MainPage>
	);
	/*return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )*/
}

NavigationManager.getInitialProps = async (ctx) => {
	const { query } = ctx;
	if (query.hasOwnProperty("p") && pages.hasOwnProperty(query.p))
		return { selection: query.p, p: query.p };
	return { selection: 0, p: null };
};
