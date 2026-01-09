import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          This is a non-commercial portfolio project created for educational
          purposes. Brand names are used for demonstration only and do not imply
          any affiliation. Product images are AI-generated or sourced from
          free-to-use image platforms.
        </p>
      </div>
    </div>
  );
};
