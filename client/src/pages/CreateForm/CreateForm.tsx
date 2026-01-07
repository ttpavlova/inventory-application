import { Link, useNavigate } from "react-router-dom";
import { SelectElem } from "../../components/SelectElem/SelectElem";
import { useCreateShoe, useGetAllFilters } from "../../hooks/list";
import { FormSkeleton } from "../../components/Skeletons/FormSkeleton/FormSkeleton";
import { Error } from "../Error/Error";
import type { FormFields } from "../../types/form.types";
import { GENDER_KEY_MAP } from "../../constants/constants";
import { useForm } from "../../hooks/useForm";
import styles from "./CreateForm.module.scss";

export const CreateForm = () => {
  const { data, loading, error } = useGetAllFilters();
  const {
    id,
    loading: loadingCreate,
    error: errorCreate,
    request: createShoe,
  } = useCreateShoe();
  const {
    selectedOptions,
    handleSubmit,
    updateSelectedOptions,
    validationErrors,
    submitStatus,
  } = useForm(createShoe);

  const navigate = useNavigate();

  if (loading) {
    return <FormSkeleton />;
  }

  if (error || !data) {
    return <Error />;
  }

  const categories = selectedOptions.gender
    ? data.categoriesByGender[GENDER_KEY_MAP[selectedOptions.gender]]
    : [];

  const formFields: FormFields[] = [
    { field: "gender", label: "gender", options: data.genders },
    { field: "season", label: "season", options: data.seasons },
    { field: "categoryId", label: "category", options: categories },
    { field: "brandId", label: "brand", options: data.brands },
    { field: "materialId", label: "material", options: data.materials },
    { field: "colorId", label: "color", options: data.colors },
  ];

  return (
    <div className={styles.container}>
      {data && (
        <>
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

            <div>
              <button
                type="submit"
                className={`${styles.btn} ${styles.btnPrimary}`}
                disabled={loadingCreate}
              >
                {loadingCreate ? `Saving...` : `Save`}
              </button>
              <button className={styles.btn} onClick={() => navigate(-1)}>
                Cancel
              </button>
            </div>
          </form>

          {submitStatus === "saved" && errorCreate && (
            <div className={styles.error}>{errorCreate}</div>
          )}
          {submitStatus === "saved" && id && (
            <div className={styles.message}>
              A shoe with ID:{" "}
              <Link to={`/shoes/${id}`} className={styles.id}>
                {id}
              </Link>{" "}
              was created successfully
            </div>
          )}
        </>
      )}
    </div>
  );
};
