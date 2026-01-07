import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import styles from "./NotFound.module.scss";

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 Error</h1>
      <p className={styles.description}>
        We couldn't find the page you're looking for
      </p>

      <Link to="/" className={styles.link}>
        <div className={styles.linkContent}>
          <ArrowLeftOutlined />
          <span className={styles.linkText}>Back to Homepage</span>
        </div>
      </Link>
    </div>
  );
};
