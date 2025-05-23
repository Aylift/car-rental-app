import styles from "./MainMenu.module.css"
import { CATEGORIES } from "../../constants/categories";
import { NavLink } from "react-router-dom";

export function MainMenu() {
	return (
		<div className={styles.mainMenu}>
			<ul>{
				CATEGORIES.map(category => {
					return (
						<li key={category.path}>
							<NavLink to={category.path}>
								{category.categoryName}
							</NavLink>
						</li>
					)
				})}</ul>
		</div>
	);
}
