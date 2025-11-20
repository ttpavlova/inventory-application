import { useNavigate } from "react-router-dom";
import { useGetFiltersQuery } from "../../../hooks/useGetFiltersQuery";
import styles from "./CreateForm.module.scss";
import { SelectElem } from "../../ui/SelectElem/SelectElem";
import { usePostShoe } from "../../../hooks/usePostShoe";
import { useState } from "react";
import type { ShoeBody } from "../../../types/types";

type FormData = Partial<ShoeBody>;

export const CreateForm = () => {
  const initialOptions: FormData = {
    gender: "",
    season: "",
    category: "",
    brand: "",
    material: "",
    color: "",
  };

  const [selectedOptions, setSelectedOptions] =
    useState<FormData>(initialOptions);
  const { isPending, error, data /* , isFetching */ } = useGetFiltersQuery();
  const {
    loading: createLoading,
    error: createError,
    createShoe,
  } = usePostShoe();

  const navigate = useNavigate();

  if (isPending || createLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!data) return "Something went wrong";

  const isValidItem = (options: FormData): options is ShoeBody => {
    return Object.keys(options).every(
      (key) => options[key as keyof ShoeBody]?.trim() != ""
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // type guard for options: ShoeBody
    if (isValidItem(selectedOptions)) {
      createShoe(selectedOptions);
    }
  };

  const updateSelectedOptions = (key: string, value: string) => {
    setSelectedOptions({ ...selectedOptions, [key]: value });
  };

  const filtersToShow = [
    { name: "gender", options: data.genders },
    { name: "season", options: data.seasons },
    { name: "category", options: data.categories },
    { name: "brand", options: data.brands },
    { name: "material", options: data.materials },
    { name: "color", options: data.colors },
  ];

  return (
    <div className={styles.wrapper}>
      {data && (
        <form onSubmit={(e) => handleSubmit(e)} className={styles.filters}>
          {filtersToShow.map((filter) => (
            <SelectElem
              key={filter.name}
              filterName={filter.name}
              options={filter.options}
              value={
                selectedOptions[filter.name as keyof typeof selectedOptions]
              }
              updateSelectedOptions={updateSelectedOptions}
            />
          ))}

          {createError && <div>{createError}</div>}

          <div>
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnPrimary}`}
            >
              Save
            </button>
            <button className={styles.btn} onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
