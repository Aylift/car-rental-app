import styles from "./IconMenu.module.css";
import CART_ICON from "../../assets/shopping-cart.svg";
import LOGIN from "../../assets/log-in.svg";
import { Link } from "react-router-dom";

export function IconMenu() {
	return (
		<ul className={styles.iconMenu}>
			<li>
				<Link to='/koszyk'>
					<img src={CART_ICON} />
				</Link>
			</li>
			<li>
				<Link to='/zaloguj'>
					<img src={LOGIN} />
				</Link>
			</li>
		</ul>
	);
}
