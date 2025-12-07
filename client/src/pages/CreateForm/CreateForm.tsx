import { Link, useNavigate } from "react-router-dom";
import { SelectElem } from "../../components/SelectElem/SelectElem";
import { useCreateShoe, useGetAllFilters } from "../../hooks/list";
import { FormSkeleton } from "../../components/Skeletons/FormSkeleton/FormSkeleton";
import type { FormFields } from "../../types/form.types";
import { useForm } from "../../hooks/useForm";
import styles from "./CreateForm.module.scss";

export const CreateForm = () => {
  const { data, loading, error } = useGetAllFilters();
  const {
    id,
    // loading: loadingCreate,
    error: errorCreate,
    request: createShoe,
  } = useCreateShoe();
  const {
    selectedOptions,
    handleSubmit,
    updateSelectedOptions,
    validationErrors,
  } = useForm(createShoe);

  const navigate = useNavigate();

  if (loading) {
    return <FormSkeleton />;
  }

  if (error || !data) {
    return <span>Something went wrong. Try again later</span>;
  }

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
