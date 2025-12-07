import { z } from "zod";
import { useState } from "react";
import type { FlattenedErrors, FormData } from "../types/form.types";
import { ShoeBodySchema, type ShoeBody } from "../schemas/schemas";

const initialOptions: FormData = {
  gender: null,
  season: null,
  categoryId: null,
  brandId: null,
  materialId: null,
  colorId: null,
};

export const useForm = (onSubmit: (body: ShoeBody) => Promise<void>) => {
  const [selectedOptions, setSelectedOptions] =
    useState<FormData>(initialOptions);
  const [validationErrors, setValidationErrors] = useState<
    FlattenedErrors<ShoeBody>
  >({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = ShoeBodySchema.safeParse(selectedOptions);

    if (!result.success) {
      const errors = z.flattenError(result.error);
      setValidationErrors(errors.fieldErrors);
      return;
    }

    setValidationErrors({});

    onSubmit(result.data);
  };

  const updateSelectedOptions = <K extends keyof ShoeBody>(
    key: K,
    value: ShoeBody[K]
  ) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return {
    selectedOptions,
    setSelectedOptions,
    handleSubmit,
    updateSelectedOptions,
    validationErrors,
  };
};
