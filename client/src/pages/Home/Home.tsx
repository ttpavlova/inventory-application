import { Link } from "react-router-dom";
import homeShoes from "@/assets/home-1.jpg";
import homeCreateShoe from "@/assets/home-2.jpg";
import styles from "./Home.module.scss";

export const Home = () => {
  return (
    <div className={styles.home}>
      <Link className={styles.card} to="/shoes">
        <div className={styles.coverWrapper}>
          <img src={homeShoes} alt="Shoes page" className={styles.cover} />
        </div>
        <span className={styles.text}>Shoes</span>
      </Link>
      <Link className={styles.card} to="/shoes/create">
        <div className={styles.coverWrapper}>
          <img
            src={homeCreateShoe}
            alt="Create a shoe page"
            className={styles.cover}
          />
        </div>
        <span className={styles.text}>Add a Shoe</span>
      </Link>
    </div>
  );
};
