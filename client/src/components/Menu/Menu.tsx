import { useApi } from "../../hooks/useApi";
import { type Category } from "../../types/types";
import styles from "./Menu.module.scss";

export const Menu = () => {
  const { loading, error, data } = useApi<Category[]>("/api/categories");

  if (loading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Something went wrong. Try again later</span>;
  }

  if (!data) {
    return <span>Filters not found</span>;
  }

  return (
    <aside className={styles.container}>
      <span>Filters</span>

      <fieldset className={styles.fieldset}>
        <legend>Categories</legend>
        {data &&
          data.map((item) => (
            <div key={item.id}>
              <input
                type="checkbox"
                id={item.name}
                name={item.name}
                value={item.name}
              />
              <label htmlFor={item.name}>{item.name}</label>
            </div>
          ))}
      </fieldset>
    </aside>
  );
};
