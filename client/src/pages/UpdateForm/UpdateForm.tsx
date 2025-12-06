import { Link, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import styles from "./UpdateForm.module.scss";
import { SelectElem } from "../../components/SelectElem/SelectElem";
import { useEffect, useState } from "react";
import { ShoeBodySchema, type ShoeBody } from "../../schemas/schemas";
import {
  useGetAllFilters,
  useGetShoeById,
  useUpdateShoe,
} from "../../hooks/list";
import { NotFound } from "../NotFound/NotFound";
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

export const UpdateForm = () => {
  const [selectedOptions, setSelectedOptions] =
    useState<FormData>(initialOptions);
  const [validationErrors, setValidationErrors] = useState<
    FlattenedErrors<ShoeBody>
  >({});
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  const { data: shoe } = useGetShoeById(Number(paramId));
  const { data, loading, error } = useGetAllFilters();
  const {
    id,
    // loading: loadingCreate,
    error: errorCreate,
    request: updateShoe,
  } = useUpdateShoe(Number(paramId));

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

  if (loading) {
    return <FormSkeleton />;
  }

  if (error || !data) {
    return <span>Something went wrong. Try again later</span>;
  }

  if (!shoe) {
    return <NotFound />;
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

    updateShoe(result.data);
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
