import type { ChangeEvent } from "react";
import type { FilterOptions } from "../../types/types";
import styles from "./SelectElem.module.scss";
import type { ShoeBody } from "../../schemas/schemas";

interface SelectElemProps {
  field: string;
  label: string;
  options: FilterOptions;
  value: ShoeBody[keyof ShoeBody] | null;
  updateSelectedOptions: (key: string, value: number | string) => void;
}

export const SelectElem = ({
  field,
  label,
  options,
  value,
  updateSelectedOptions,
}: SelectElemProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = isNaN(Number(e.target.value))
      ? e.target.value
      : Number(e.target.value);

    updateSelectedOptions(field, id);
  };

  return (
    <div className={styles.row}>
      <label htmlFor={field}>Choose a {label}:</label>
      <select
        name={field}
        id={field}
        value={value ?? ""}
        onChange={(e) => handleChange(e)}
        // required
      >
        <option value="" disabled>
          --Please choose an option--
        </option>
        {options.map((option, i) => (
          <option key={`${option.name}-${i}`} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
