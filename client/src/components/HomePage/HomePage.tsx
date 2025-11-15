import { Link } from "react-router-dom";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <Link to="/shoes">Shoe List</Link>
      <Link to="/categories">Categories</Link>
      <Link to="/new-shoe">Add a Shoe</Link>
    </div>
  );
};
