import { useGetAllCategories } from "../../hooks/list";
import styles from "./Menu.module.scss";

export const Menu = () => {
  const { loading, error, data } = useGetAllCategories();

  return (
    <aside className={styles.container}>
      <span>Filters</span>

      {loading && <div>Loading...</div>}
      {error && <div>Something went wrong. Try again later</div>}

      {data && (
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
      )}
    </aside>
  );
};
