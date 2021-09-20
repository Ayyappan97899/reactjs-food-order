import { Fragment } from "react";
import styles from "./Header.module.css";
import mealImg from "../../assest/meals.jpg";
import HeaderButton from "./HeaderButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>MealsFood</h1>
        <HeaderButton setmodal={props.setmod} />
      </header>
      <div className={styles["main-image"]}>
        <img src={mealImg} alt=" A table of Meals!" />
      </div>
    </Fragment>
  );
};

export default Header;
