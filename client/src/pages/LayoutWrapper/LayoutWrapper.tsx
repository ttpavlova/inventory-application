import type { ReactNode } from "react";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import styles from "./LayoutWrapper.module.scss";

export const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.container}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
