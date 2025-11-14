import { Link } from "react-router-dom";
import type { Shoe } from "../../types/types";
import styles from "./ShoeCard.module.scss";

interface ShoeCardProps {
  shoe: Shoe;
}

const ShoeCard = ({ shoe }: ShoeCardProps) => {
  const exampleSizes = [37, 38, 39, 40];

  return (
    <Link to={`/${shoe.id}`} className={styles.container}>
      <div className={styles.main}>
        <img className={styles.cover} />

        <span className={styles.detail}>
          {`${shoe.category} ${shoe.gender} ${shoe.season} ${shoe.brand}`}
        </span>
        <div className={styles.sizes}>
          {exampleSizes.map((size) => (
            <span className={styles.size}>{size}</span>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.btn}>Add to cart</div>
      </div>
    </Link>
  );
};

export default ShoeCard;
