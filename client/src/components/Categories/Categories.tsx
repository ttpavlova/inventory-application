import { useEffect, useState } from "react";
import type { Category } from "../../types/types";
import CategoryCard from "./CategoryCard";
import styles from "./Categories.module.scss";

const Categories = () => {
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/categories");
      const result = await res.json();
      setData(result.data);
    };

    fetchData();
  }, []);

  const items = data.map((item) => (
    <div key={item.id}>
      <CategoryCard name={item.name} />
    </div>
  ));

  return <div className={styles.wrapper}>{items}</div>;
};

export default Categories;
