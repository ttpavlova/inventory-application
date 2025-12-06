import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import styles from "./CreateForm.module.scss";
import { SelectElem } from "../../components/SelectElem/SelectElem";
import { useState } from "react";
import { ShoeBodySchema, type ShoeBody } from "../../schemas/schemas";
import { useCreateShoe, useGetAllFilters } from "../../hooks/list";
import { FormSkeleton } from "../../components/Skeletons/FormSkeleton/FormSkeleton";
import type {
  FlattenedErrors,
  FormData,
  FormFields,
} from "../../types/form.types";

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
  const [validationErrors, setValidationErrors] = useState<
    FlattenedErrors<ShoeBody>
  >({});
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = ShoeBodySchema.safeParse(selectedOptions);

    if (!result.success) {
      const errors = z.flattenError(result.error);
      setValidationErrors(errors.fieldErrors);
      return;
    }

    setValidationErrors({});

    createShoe(result.data);
  };

  const updateSelectedOptions = (
    key: keyof ShoeBody,
    value: string | number
  ) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [key]: value,
    }));
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
              error={validationErrors?.[field]?.toString() ?? null}
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
