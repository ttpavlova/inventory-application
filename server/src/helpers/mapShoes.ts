import type { ShoeDbWithRelations, ShoeWithRelations } from "../types/types.js";

export const transformShoe = (shoe: ShoeDbWithRelations): ShoeWithRelations => {
  return {
    id: shoe.id,
    gender: shoe.gender,
    season: shoe.season,
    category: {
      id: shoe.category_id,
      name: shoe.category_name,
    },
    brand: {
      id: shoe.brand_id,
      name: shoe.brand_name,
    },
    material: {
      id: shoe.material_id,
      name: shoe.material_name,
    },
    color: {
      id: shoe.color_id,
      name: shoe.color_name,
    },
  };
};
