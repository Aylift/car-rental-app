import styles from "./Hero.module.css";
import { CenteredContent } from "../CenteredContent/CenteredContent";

export function Hero({ heroImage }) {
	return (
		<div
			className={styles.hero}
			style={{ backgroundImage: `url(${heroImage})` }}>
			<CenteredContent>
				<div className={styles.contentWrapper}>
					<h2>Wypożycz swój wymarzony samochód już teraz!</h2>
					<p>Dostępna nowa baza pojazdów</p>
					<button>Wybierz swój pojazd</button>
				</div>
			</CenteredContent>
		</div>
	);
}
