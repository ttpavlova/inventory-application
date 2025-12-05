import styles from "./MenuSkeleton.module.scss";

export const MenuSkeleton = () => {
  return (
    <div className={styles.menu}>
      <div className={styles.filters} />
    </div>
  );
};
