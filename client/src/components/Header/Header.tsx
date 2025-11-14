import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link to="/">Shoe Shop</Link>
      </div>
    </div>
  );
};
