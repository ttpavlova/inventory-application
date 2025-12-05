import { Link, useNavigate } from "react-router-dom";
import styles from "./CreateForm.module.scss";
import { SelectElem } from "../../components/SelectElem/SelectElem";
import { useState } from "react";
import type { ShoeBody } from "../../schemas/schemas";
import { useCreateShoe, useGetAllFilters } from "../../hooks/list";
import { FormSkeleton } from "../../components/Skeletons/FormSkeleton/FormSkeleton";
import type { FormData, FormFields } from "../../types/form.types";

const initialOptions: FormData = {
  gender: null,
  season: null,
  categoryId: null,
  brandId: null,
  materialId: null,
  colorId: null,
};

export const CreateForm = () => {
  const [selectedOptions, setSelectedOptions] =
    useState<FormData>(initialOptions);
  const { data, loading, error } = useGetAllFilters();
  const {
    id,
    // loading: loadingCreate,
    error: errorCreate,
    request: createShoe,
  } = useCreateShoe();

  const navigate = useNavigate();

  if (loading) {
    return <FormSkeleton />;
  }

  if (error || !data) {
    return <span>Something went wrong. Try again later</span>;
  }

  const isValidItem = (options: FormData): options is ShoeBody => {
    return Object.keys(options).every(
      (key) => options[key as keyof ShoeBody] != null
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // type guard for options: ShoeBody
    if (isValidItem(selectedOptions)) {
      createShoe(selectedOptions);
    }
  };

  const updateSelectedOptions = (key: string, value: string | number) => {
    setSelectedOptions({
      ...selectedOptions,
      [key]: value,
    });
  };

  const formFields: FormFields[] = [
    { field: "gender", label: "gender", options: data.genders },
    { field: "season", label: "season", options: data.seasons },
    { field: "categoryId", label: "category", options: data.categories },
    { field: "brandId", label: "brand", options: data.brands },
    { field: "materialId", label: "material", options: data.materials },
    { field: "colorId", label: "color", options: data.colors },
  ];

  return (
    <div className={styles.container}>
      {data && (
        <form onSubmit={(e) => handleSubmit(e)} className={styles.filters}>
          {formFields.map(({ field, label, options }) => (
            <SelectElem
              key={label}
              field={field}
              label={label}
              options={options}
              value={selectedOptions[field]}
              updateSelectedOptions={updateSelectedOptions}
            />
          ))}

          {errorCreate && <div>{errorCreate}</div>}
          {id && (
            <div>
              A shoe with ID: <Link to={`/shoes/${id}`}>{id}</Link> was created
              successfully
            </div>
          )}

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
