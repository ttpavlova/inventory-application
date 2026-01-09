import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";

export const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
