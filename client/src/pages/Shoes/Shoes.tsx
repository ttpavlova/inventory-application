import { Menu } from "../../components/Menu/Menu";
import styles from "./Shoes.module.scss";
import { ShoeList } from "../../components/ShoeList/ShoeList";
import { useState } from "react";
import { Error } from "../Error/Error";

export const Shoes = () => {
  const [error, setError] = useState(false);

  if (error) return <Error />;

  return (
    <div className={styles.shoes}>
      <Menu onError={() => setError(true)} />

      <ShoeList onError={() => setError(true)} />
    </div>
  );
};
