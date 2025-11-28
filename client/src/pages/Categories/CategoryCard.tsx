import type { Category } from "../../types/types";

interface CategoryCardProps {
  name: Category["name"];
}

export const CategoryCard = ({ name }: CategoryCardProps) => {
  return <div>{name}</div>;
};
