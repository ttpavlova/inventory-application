import styles from "./FormSkeleton.module.scss";

export const FormSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <div className={styles.row}>
          <div className={styles.label} />
          <div className={styles.select} />
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={styles.select} />
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={styles.select} />
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={styles.select} />
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={styles.select} />
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={styles.select} />
        </div>
      </div>
    </div>
  );
};
