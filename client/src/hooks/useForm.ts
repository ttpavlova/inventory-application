import { z } from "zod";
import { useEffect, useState } from "react";
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

type SubmitStatus = "unsaved" | "saved";

export const useForm = (onSubmit: (body: ShoeBody) => Promise<void>) => {
  const [selectedOptions, setSelectedOptions] =
    useState<FormData>(initialOptions);
  const [validationErrors, setValidationErrors] = useState<
    FlattenedErrors<ShoeBody>
  >({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("unsaved");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus("saved");

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
    value: ShoeBody[K] | null
  ) => {
    if (submitStatus !== "unsaved") {
      setSubmitStatus("unsaved");
    }

    setSelectedOptions((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    updateSelectedOptions("categoryId", null);
  }, [selectedOptions.gender]);

  return {
    selectedOptions,
    setSelectedOptions,
    handleSubmit,
    updateSelectedOptions,
    validationErrors,
    submitStatus,
  };
};
