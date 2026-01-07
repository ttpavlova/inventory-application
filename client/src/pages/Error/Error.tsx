import { ReloadOutlined } from "@ant-design/icons";
import styles from "./Error.module.scss";

export const Error = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Something went wrong</h1>
      <p className={styles.description}>Please try again</p>

      <button className={styles.btn} onClick={() => window.location.reload()}>
        <div className={styles.btnContent}>
          <ReloadOutlined />
          <span className={styles.btnText}>Refresh page</span>
        </div>
      </button>
    </div>
  );
};
