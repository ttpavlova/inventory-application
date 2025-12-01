import styles from "./ShoeCardSkeleton.module.scss";

export const ShoeCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.main}>
        <div className={styles.cover} />

        <div className={styles.detail}>
          <div className={styles.line} />
          <div className={styles.line} />
          <div className={styles.line} />
        </div>
      </div>
    </div>
  );
};
