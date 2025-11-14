import type { Shoe } from "../../types/types";
import styles from "./ShoeCard.module.scss";

interface ShoeCardProps {
  shoe: Shoe;
}

const ShoeCard = ({ shoe }: ShoeCardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <img className={styles.cover} />

        <span className={styles.detail}>
          {`${shoe.category} ${shoe.gender} ${shoe.season} ${shoe.brand}`}
        </span>
        <div className={styles.sizes}>
          {`${shoe.category} ${shoe.gender} ${shoe.season} ${shoe.brand}`}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.btn}>Add to cart</div>
      </div>
    </div>
  );
};

export default ShoeCard;
