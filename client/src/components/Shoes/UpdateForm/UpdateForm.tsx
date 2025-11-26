import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./UpdateForm.module.scss";
import { SelectElem } from "../../ui/SelectElem/SelectElem";
import { useEffect, useState } from "react";
import type { FilterOptions, ShoeBodyView } from "../../../types/types";
import type { ShoeBody } from "../../../schemas/schemas";
import {
  useGetAllFilters,
  useGetShoeById,
  useUpdateShoe,
} from "../../../hooks/list";

type FormData = {
  [k in keyof ShoeBody]: ShoeBody[k] | null;
};

type FormFields = {
  field: keyof ShoeBody;
  label: keyof ShoeBodyView;
  options: FilterOptions;
};

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

  const { id: paramId } = useParams();
  const navigate = useNavigate();

  const { data: shoe } = useGetShoeById(Number(paramId));
  const { data, loading, error } = useGetAllFilters();
  const {
    id,
    // loading: loadingCreate,
    error: errorCreate,
    request: createShoe,
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
    return <span>Loading...</span>;
  }

  if (error || !data) {
    return <span>Something went wrong. Try again later</span>;
  }

  if (!shoe) {
    return <span>Shoe not found</span>;
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
    <div className={styles.wrapper}>
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
