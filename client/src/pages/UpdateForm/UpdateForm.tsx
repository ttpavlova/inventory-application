import { Link, useNavigate, useParams } from "react-router-dom";
import { SelectElem } from "../../components/SelectElem/SelectElem";
import { useEffect } from "react";
import {
  useGetAllFilters,
  useGetShoeById,
  useUpdateShoe,
} from "../../hooks/list";
import { NotFound } from "../NotFound/NotFound";
import { FormSkeleton } from "../../components/Skeletons/FormSkeleton/FormSkeleton";
import type { FormFields } from "../../types/form.types";
import { GENDER_KEY_MAP } from "../../constants/constants";
import { useForm } from "../../hooks/useForm";
import styles from "./UpdateForm.module.scss";

export const UpdateForm = () => {
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  const {
    data: shoe,
    loading: loadingShoe,
    error: errorShoe,
  } = useGetShoeById(Number(paramId));
  const { data, loading, error } = useGetAllFilters();
  const {
    id,
    // loading: loadingCreate,
    error: errorCreate,
    request: updateShoe,
  } = useUpdateShoe(Number(paramId));
  const {
    selectedOptions,
    setSelectedOptions,
    handleSubmit,
    updateSelectedOptions,
    validationErrors,
  } = useForm(updateShoe);

  useEffect(() => {
    setSelectedOptions({
      gender: shoe?.gender || null,
      season: shoe?.season || null,
      categoryId: shoe?.category?.id || null,
      brandId: shoe?.brand?.id || null,
      materialId: shoe?.material?.id || null,
      colorId: shoe?.color?.id || null,
    });
  }, [shoe]);

  if (loading || loadingShoe) {
    return <FormSkeleton />;
  }

  if (error || errorShoe || !data) {
    return <span>Something went wrong. Try again later</span>;
  }

  if (!shoe) {
    return <NotFound />;
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
              A shoe with ID: <Link to={`/shoes/${id}`}>{id}</Link> was updated
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
