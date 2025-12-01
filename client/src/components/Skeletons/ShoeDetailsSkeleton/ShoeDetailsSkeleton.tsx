import styles from "./ShoeDetailsSkeleton.module.scss";

export const ShoeDetailsSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
      </div>
      <div className={styles.coverContainer}>
        <div className={styles.cover} />
      </div>
    </div>
  );
};
