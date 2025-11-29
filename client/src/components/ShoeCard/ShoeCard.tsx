import { Link } from "react-router-dom";
import type { ShoeView } from "../../types/types";
import styles from "./ShoeCard.module.scss";

interface ShoeCardProps {
  shoe: ShoeView;
}

const ShoeCard = ({ shoe }: ShoeCardProps) => {
  return (
    <Link to={`/shoes/${shoe.id}`} className={styles.card}>
      <div className={styles.main}>
        <img className={styles.cover} />

        <div className={styles.detail}>
          <span className={styles.id}>
            <b>ID:</b> {shoe.id}
          </span>
          <span>{`${shoe.category} ${shoe.gender} ${shoe.season} ${shoe.brand}`}</span>
        </div>
      </div>

      <div className={styles.footer}>
        <Link to={`/shoes/update/${shoe.id}`} className={styles.btn}>
          Edit
        </Link>
      </div>
    </Link>
  );
};

export default ShoeCard;
