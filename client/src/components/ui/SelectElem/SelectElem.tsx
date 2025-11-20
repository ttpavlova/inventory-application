import type { ChangeEvent } from "react";
import type { FilterOptions } from "../../../types/types";
import styles from "./SelectElem.module.scss";

interface SelectElemProps {
  filterName: string;
  options: FilterOptions;
  value: string | undefined;
  updateSelectedOptions: (key: string, value: string) => void;
}

export const SelectElem = ({
  filterName,
  options,
  value,
  updateSelectedOptions,
}: SelectElemProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateSelectedOptions(filterName, e.target.value);
  };

  return (
    <div className={styles.select}>
      <label htmlFor={filterName}>Choose a {filterName}:</label>
      <select
        name={filterName}
        id={filterName}
        value={value ?? ""}
        onChange={(e) => handleChange(e)}
        // required
      >
        <option value="" disabled>
          --Please choose an option--
        </option>
        {options.map((option, i) => (
          <option key={`${option.name}-${i}`} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
