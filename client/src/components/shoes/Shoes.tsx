import { useCustomQuery } from "../../hooks/useCustomQuery";
import ShoeCard from "./ShoeCard";
import styles from "./Shoes.module.scss";

const Shoes = () => {
  const { isPending, error, data /* , isFetching */ } = useCustomQuery();

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className={styles.mainContainer}>
      <aside className={styles.menu}>Menu</aside>

      <div className={styles.shoesContainer}>
        {data && data.map((shoe) => <ShoeCard key={shoe.id} shoe={shoe} />)}
      </div>
    </div>
  );
};

export default Shoes;
