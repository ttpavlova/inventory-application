import { Link, useNavigate, useParams } from "react-router-dom";
import { SelectElem } from "../../components/SelectElem/SelectElem";
import { useEffect } from "react";
import {
  useGetAllFilters,
  useGetShoeById,
  useUpdateShoe,
} from "../../hooks/useShoesApi";
import { NotFound } from "../NotFound/NotFound";
import { Error } from "../Error/Error";
import { FormSkeleton } from "../../components/Skeletons/FormSkeleton/FormSkeleton";
import type { FormFields } from "../../types/form.types";
import { GENDER_KEY_MAP } from "../../constants/constants";
import { useForm } from "../../hooks/useForm";
import styles from "./UpdateForm.module.scss";

export const UpdateForm = () => {
  const { id } = useParams();
  const paramId = Number(id);
  const navigate = useNavigate();

  const {
    data: shoe,
    loading: loadingShoe,
    error: errorShoe,
  } = useGetShoeById(paramId);
  const { data: filters, loading, error } = useGetAllFilters();
  const {
    id: shoeId,
    loading: loadingUpdate,
    error: errorUpdate,
    request: updateShoe,
  } = useUpdateShoe(paramId);
  const {
    selectedOptions,
    setSelectedOptions,
    handleSubmit,
    updateSelectedOptions,
    validationErrors,
    submitStatus,
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

  if (Number.isNaN(shoeId)) return <NotFound />;

  if (loading || loadingShoe) return <FormSkeleton />;

  if (error || errorShoe) return <Error />;

  if (!shoe) return <NotFound />;

  if (!filters) return <Error />;

  const categories = selectedOptions.gender
    ? filters.categoriesByGender[GENDER_KEY_MAP[selectedOptions.gender]]
    : [];

  const formFields: FormFields[] = [
    { field: "gender", label: "gender", options: filters.genders },
    { field: "season", label: "season", options: filters.seasons },
    { field: "categoryId", label: "category", options: categories },
    { field: "brandId", label: "brand", options: filters.brands },
    { field: "materialId", label: "material", options: filters.materials },
    { field: "colorId", label: "color", options: filters.colors },
  ];

  return (
    <div className={styles.container}>
      {filters && (
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
                disabled={loadingUpdate}
              >
                {loadingUpdate ? `Saving...` : `Save`}
              </button>
              <button className={styles.btn} onClick={() => navigate(-1)}>
                Cancel
              </button>
            </div>
          </form>

          {submitStatus === "saved" && errorUpdate && (
            <div className={styles.error}>{errorUpdate}</div>
          )}
          {submitStatus === "saved" && shoeId && (
            <div className={styles.message}>
              A shoe with ID:{" "}
              <Link to={`/shoes/${shoeId}`} className={styles.id}>
                {shoeId}
              </Link>{" "}
              was updated successfully
            </div>
          )}
        </>
      )}
    </div>
  );
};
