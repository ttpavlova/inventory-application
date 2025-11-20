import type { Request, Response } from "express";
import { z } from "zod";
import {
  getShoesQuery,
  getShoeByIdQuery,
  createShoeQuery,
  updateShoeQuery,
  deleteShoeQuery,
  getTotalItems,
} from "../db/shoesQueries.js";
import {
  GENDERS,
  SEASONS,
  type ItemResponseBody,
  type ListResponseBody,
  type MutationResponseBody,
  type NoParams,
  type ShoeBodyRequest,
  type ShoeParams,
  type ShoeRequest,
  type ShoeResponse,
} from "../types/types.js";
import { buildErrorResponse } from "../helpers/buildErrorResponse.js";

const Shoe = z.object({
  gender: z.enum(GENDERS),
  season: z.enum(SEASONS),
  categoryId: z.number(),
  brandId: z.number(),
  materialId: z.number(),
  colorId: z.number(),
});

type Shoe = z.infer<typeof Shoe>;

async function getShoes(
  req: Request,
  res: Response<ListResponseBody<ShoeResponse[]>>
) {
  const { page = 1 } = req.query;

  try {
    const shoes = await getShoesQuery(Number(page));
    const totalItems = await getTotalItems();

    res.status(200).json({
      data: shoes,
      totalItems,
    });
  } catch (error) {
    res
      .status(500)
      .json(
        buildErrorResponse(
          "Database error: failed to get a list of shoes",
          error
        )
      );
  }
}

async function getShoeById(
  req: Request<ShoeParams>,
  res: Response<ItemResponseBody<ShoeResponse>>
) {
  const { id } = req.params;

  try {
    const shoe = await getShoeByIdQuery(id);

    if (!shoe) {
      return res.status(404).json({ message: "Shoe not found" });
    }

    res.status(200).json({
      data: shoe,
    });
  } catch (error) {
    res
      .status(500)
      .json(
        buildErrorResponse("Database error: failed to get a shoe by id", error)
      );
  }
}

async function createShoe(
  req: Request<
    NoParams,
    MutationResponseBody<ShoeRequest, Shoe>,
    ShoeBodyRequest
  >,
  res: Response<MutationResponseBody<ShoeRequest, Shoe>>
) {
  const { ...shoeData } = req.body;

  const validatedFields = Shoe.safeParse(shoeData);
  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);

    return res.status(400).json({
      errors: flattened.fieldErrors,
      // message: "Missing fields. Failed to create a shoe",
    });
  }

  try {
    const newShoe = await createShoeQuery(shoeData);

    res.status(201).json({
      data: newShoe,
    });
  } catch (error) {
    res
      .status(500)
      .json(
        buildErrorResponse("Database error: failed to create a shoe", error)
      );
  }
}

async function updateShoe(
  req: Request<
    ShoeParams,
    MutationResponseBody<ShoeRequest, Shoe>,
    ShoeBodyRequest
  >,
  res: Response<MutationResponseBody<ShoeRequest, Shoe>>
) {
  const { id } = req.params;
  const { ...shoeData } = req.body;

  const validatedFields = Shoe.safeParse(shoeData);
  if (!validatedFields.success) {
    const flattened = z.flattenError(validatedFields.error);

    return res.status(400).json({
      errors: flattened.fieldErrors,
    });
  }

  try {
    const newShoe = await updateShoeQuery(id, shoeData);

    if (!newShoe) {
      return res.status(404).json({ message: "Shoe not found" });
    }

    res.status(200).json({
      data: newShoe,
    });
  } catch (error) {
    res
      .status(500)
      .json(
        buildErrorResponse("Database error: failed to update a shoe", error)
      );
  }
}

async function deleteShoe(
  req: Request<ShoeParams>,
  res: Response<ItemResponseBody<ShoeRequest>>
) {
  const { id } = req.params;

  try {
    const deletedShoe = await deleteShoeQuery(id);

    if (!deletedShoe) {
      return res.status(404).json({ message: "Shoe not found" });
    }

    res.status(200).json({
      data: deletedShoe,
    });
  } catch (error) {
    res
      .status(500)
      .json(
        buildErrorResponse("Database error: failed to delete a shoe", error)
      );
  }
}

export { getShoes, getShoeById, createShoe, updateShoe, deleteShoe };
