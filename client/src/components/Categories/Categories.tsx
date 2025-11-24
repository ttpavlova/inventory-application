import type { Category } from "../../types/types";
import CategoryCard from "./CategoryCard";
import styles from "./Categories.module.scss";
import { useApi } from "../../hooks/useApi";

const Categories = () => {
  const { data, loading, error } = useApi<Category[]>("/api/categories");

  if (loading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Something went wrong. Try again later</span>;
  }

  if (data && data.length === 0) {
    return <span>Categories not found</span>;
  }

  const items =
    data &&
    data.map((item) => (
      <div key={item.id}>
        <CategoryCard name={item.name} />
      </div>
    ));

  return <div className={styles.wrapper}>{items}</div>;
};

export default Categories;
