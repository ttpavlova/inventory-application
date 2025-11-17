import { useGetCategoriesQuery } from "../../hooks/useGetCategoriesQuery";
import styles from "./Menu.module.scss";

export const Menu = () => {
  const { isPending, error, data /* , isFetching */ } = useGetCategoriesQuery();

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

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
