import { Link } from "react-router-dom";
import type { ShoeView } from "../../types/types";
import styles from "./ShoeCard.module.scss";
import { getImage } from "../../helpers/getImage";

interface ShoeCardProps {
  shoe: ShoeView;
}

const ShoeCard = ({ shoe }: ShoeCardProps) => {
  return (
    <Link to={`/shoes/${shoe.id}`} className={styles.card}>
      <div className={styles.main}>
        <img
          src={getImage(shoe.gender, shoe.category, shoe.brand)}
          alt={`${shoe.category} ${shoe.brand}`}
          className={styles.cover}
        />

        <div className={styles.detail}>
          <span className={styles.id}>
            <strong>ID:</strong> {shoe.id}
          </span>
          <span>
            <strong>{shoe.category}</strong>
            {` ${shoe.gender} ${shoe.season} ${shoe.brand}`}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ShoeCard;
