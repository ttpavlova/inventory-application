import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

export const Home = () => {
  return (
    <div className={styles.home}>
      <Link to="/shoes">Shoes</Link>
      <Link to="/categories">Categories</Link>
      <Link to="/shoes/create">Add a Shoe</Link>
    </div>
  );
};
