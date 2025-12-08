import { ShoeCardSkeleton } from "../ShoeCardSkeleton/ShoeCardSkeleton";
import styles from "./ShoeListSkeleton.module.scss";

export const ShoeListSkeleton = () => {
  const limit = 10;
  const itemNumbers = Array.from(Array(limit).keys());

  return (
    <div className={styles.list}>
      <div className={styles.cards}>
        {itemNumbers.map((item, i) => (
          <ShoeCardSkeleton key={`${item}-${i}`} />
        ))}
        <div className={styles.pagination} />
      </div>
    </div>
  );
};
