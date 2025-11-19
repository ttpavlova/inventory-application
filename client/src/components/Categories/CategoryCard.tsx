import type { Category } from "../../types/types";

interface CategoryCardProps {
  name: Category["name"];
}

const CategoryCard = ({ name }: CategoryCardProps) => {
  return <div>{name}</div>;
};

export default CategoryCard;
