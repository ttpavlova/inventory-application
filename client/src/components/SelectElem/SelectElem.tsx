import type { ChangeEvent } from "react";
import type { FilterOptions } from "../../types/types";
import styles from "./SelectElem.module.scss";
import cls from "classnames";
import type { ShoeBody } from "../../schemas/schemas";

interface SelectElemProps {
  field: keyof ShoeBody;
  label: string;
  options: FilterOptions;
  value: ShoeBody[keyof ShoeBody] | null;
  updateSelectedOptions: <K extends keyof ShoeBody>(
    key: K,
    value: ShoeBody[K]
  ) => void;
  error: string | null;
}

export const SelectElem = ({
  field,
  label,
  options,
  value,
  updateSelectedOptions,
  error,
}: SelectElemProps) => {
  const isDisabled = options.length === 0;
  const placeholder =
    label === "category"
      ? "--Please select gender first--"
      : `--Please select a ${label}--`;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = isNaN(Number(e.target.value))
      ? (e.target.value as ShoeBody[keyof ShoeBody])
      : Number(e.target.value);

    updateSelectedOptions(field, id);
  };

  return (
    <div className={cls(styles.row, { [styles.disabled]: isDisabled })}>
      <label htmlFor={field}>Select a {label}:</label>
      <div>
        <select
          name={field}
          id={field}
          value={value ?? ""}
          onChange={(e) => handleChange(e)}
          aria-describedby={`${field}-error`}
          disabled={isDisabled}
          // required
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option, i) => (
            <option key={`${option.name}-${i}`} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <div
          id={`${field}-error`}
          className={styles.errorContainer}
          aria-live="polite"
          aria-atomic="true"
        >
          {error && (
            <p className={styles.error} key={error}>
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
