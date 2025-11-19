import { useNavigate } from "react-router-dom";
import { useGetFiltersQuery } from "../../../hooks/useGetFiltersQuery";
import styles from "./CreateForm.module.scss";

export const CreateForm = () => {
  const { isPending, error, data /* , isFetching */ } = useGetFiltersQuery();

  const navigate = useNavigate();

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        <div className={styles.select}>
          <label htmlFor="pet-select">Choose a category:</label>
          <select name="pets" id="pet-select">
            <option value="">--Please choose an option--</option>
            {data?.categories.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.select}>
          <label htmlFor="pet-select">Choose a brand:</label>
          <select name="pets" id="pet-select">
            <option value="">--Please choose an option--</option>
            {data?.brands.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.select}>
          <label htmlFor="pet-select">Choose a material:</label>
          <select name="pets" id="pet-select">
            <option value="">--Please choose an option--</option>
            {data?.materials.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.select}>
          <label htmlFor="pet-select">Choose a color:</label>
          <select name="pets" id="pet-select">
            <option value="">--Please choose an option--</option>
            {data?.colors.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>Save</button>
          <button className={styles.btn} onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
