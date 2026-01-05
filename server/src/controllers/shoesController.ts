import type { Request, Response } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import { z } from "zod";
import {
  getShoesQuery,
  getShoeByIdQuery,
  createShoeQuery,
  updateShoeQuery,
  deleteShoeQuery,
  getGenderCategoryId,
} from "../db/shoesQueries.js";
import {
  type DeleteResponse,
  type GetListResponse,
  type GetResponse,
  type PostResponse,
  type PutResponse,
  type ShoeDetailsDto,
  type ShoeParams,
  type ShoeListItemDto,
} from "../types/types.js";
import { buildErrorResponse } from "../helpers/buildErrorResponse.js";
import { ShoeBodySchema, type ShoeBody } from "../schemas/schemas.js";
import { transformShoe } from "../helpers/mapShoes.js";

async function getShoes(
  req: Request,
  res: Response<GetListResponse<ShoeListItemDto>>
) {
  const { page = 1, limit = 10, categories } = req.query;

  try {
    const filters = { categories: categories?.toString().split(",") || [] };
    const { rows: shoes, totalCount } = await getShoesQuery(
      Number(page),
      Number(limit),
      filters
    );

    res.status(200).json({
      items: shoes,
      totalCount,
    });
  } catch (error) {
    res
      .status(500)
      .json(buildErrorResponse("Error: failed to get a list of shoes", error));
  }
}

async function getShoeById(
  req: Request<ShoeParams>,
  res: Response<GetResponse<ShoeDetailsDto>>
) {
  const { id } = req.params;

  try {
    const shoe = await getShoeByIdQuery(id);

    if (!shoe) {
      return res.status(404).json({ message: "Shoe not found" });
    }

    const mappedShoe = transformShoe(shoe);

    res.status(200).json(mappedShoe);
  } catch (error) {
    res
      .status(500)
      .json(buildErrorResponse("Error: failed to get a shoe by id", error));
  }
}

async function createShoe(
  req: Request<
    ParamsDictionary,
    PostResponse<ShoeListItemDto, ShoeBody>,
    ShoeBody
  >,
  res: Response<PostResponse<ShoeListItemDto, ShoeBody>>
) {
  const validatedFields = ShoeBodySchema.safeParse(req.body);
  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);

    return res.status(400).json({
      errors: flattened.fieldErrors,
    });
  }

  const shoeData = validatedFields.data;
  const { gender, categoryId, ...restShoeData } = shoeData;

  const genderCategoryIdCombination = await getGenderCategoryId(
    gender,
    categoryId
  );

  if (!genderCategoryIdCombination) {
    return res
      .status(400)
      .json({ message: "Invalid 'gender' and 'categoryId' combination" });
  }

  try {
    const { id: genderCategoryId } = genderCategoryIdCombination;
    const newShoe = await createShoeQuery({
      genderCategoryId,
      ...restShoeData,
    });

    res.status(201).json(newShoe);
  } catch (error) {
    res
      .status(500)
      .json(buildErrorResponse("Error: failed to create a shoe", error));
  }
}

async function updateShoe(
  req: Request<ShoeParams, PutResponse<ShoeListItemDto, ShoeBody>, ShoeBody>,
  res: Response<PutResponse<ShoeListItemDto, ShoeBody>>
) {
  const { id } = req.params;
  const validatedFields = ShoeBodySchema.safeParse(req.body);
  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);

    return res.status(400).json({
      errors: flattened.fieldErrors,
    });
  }

  const shoeData = validatedFields.data;
  const { gender, categoryId, ...restShoeData } = shoeData;

  const genderCategoryIdCombination = await getGenderCategoryId(
    gender,
    categoryId
  );

  if (!genderCategoryIdCombination) {
    return res
      .status(400)
      .json({ message: "Invalid 'gender' and 'categoryId' combination" });
  }

  try {
    const { id: genderCategoryId } = genderCategoryIdCombination;
    const newShoe = await updateShoeQuery(id, {
      genderCategoryId,
      ...restShoeData,
    });

    if (!newShoe) {
      return res.status(404).json({ message: "Shoe not found" });
    }

    res.status(200).json(newShoe);
  } catch (error) {
    res
      .status(500)
      .json(buildErrorResponse("Error: failed to update a shoe", error));
  }
}

async function deleteShoe(
  req: Request<ShoeParams>,
  res: Response<DeleteResponse>
) {
  const { id } = req.params;

  try {
    const deletedShoe = await deleteShoeQuery(id);

    if (!deletedShoe) {
      return res.status(404).json({ message: "Shoe not found" });
    }

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json(buildErrorResponse("Error: failed to delete a shoe", error));
  }
}

export { getShoes, getShoeById, createShoe, updateShoe, deleteShoe };
