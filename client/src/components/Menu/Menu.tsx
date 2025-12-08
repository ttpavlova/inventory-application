import { useSearchParams } from "react-router-dom";
import { useGetAllCategories } from "../../hooks/list";
import styles from "./Menu.module.scss";
import { MenuSkeleton } from "../Skeletons/MenuSkeleton/MenuSkeleton";

export const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoriesIds = searchParams.get("categories")?.split(",") || [];

  const { loading, error, data } = useGetAllCategories();

  if (loading) {
    return <MenuSkeleton />;
  }

  if (error) {
    return <div>Something went wrong. Try again later</div>;
  }

  const toggleCategory = (id: string, prevIds: string[]) => {
    const ids = new Set(prevIds);

    if (ids.has(id)) {
      ids.delete(id);
    } else {
      ids.add(id);
    }

    return Array.from(ids);
  };

  const updateFilters = (id: string) => {
    const updatedIds = toggleCategory(id, categoriesIds);

    setSearchParams((searchParams) => {
      if (updatedIds.length === 0) {
        searchParams.delete("categories");
      } else {
        searchParams.set("categories", updatedIds.join(","));
      }

      searchParams.delete("page");

      return searchParams;
    });
  };

  return (
    <aside className={styles.menu}>
      <span className={styles.title}>Filters</span>

      <hr />

      <fieldset className={styles.fieldset}>
        <legend className={styles.filterName}>Categories</legend>

        {data &&
          data.map((item) => (
            <div key={item.id}>
              <input
                type="checkbox"
                id={item.name}
                name={item.name}
                value={item.name}
                checked={categoriesIds.includes(String(item.id))}
                onChange={() => updateFilters(String(item.id))}
              />
              <label htmlFor={item.name}>{item.name}</label>
            </div>
          ))}
      </fieldset>
    </aside>
  );
};
