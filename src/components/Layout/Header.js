import { HeaderCardButton } from "./HeaderCardButton";
import mealsImage from "../../assets/meals.jpg";

import styles from "./Header.module.css";

export const Header = (props) => {
	return (
		<>
			<header className={styles.header}>
				<h1>ReactMeals</h1>
				<HeaderCardButton onClick={props.onShowCart} />
			</header>
			<div className={styles["main-image"]}>
				<img src={mealsImage} alt="A table full of foods" />
			</div>
		</>
	);
};
