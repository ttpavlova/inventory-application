import { Menu } from "../../components/Menu/Menu";
import styles from "./Shoes.module.scss";
import { ShoeList } from "../../components/ShoeList/ShoeList";

export const Shoes = () => {
  return (
    <div className={styles.shoes}>
      <Menu />

      <ShoeList />
    </div>
  );
};
