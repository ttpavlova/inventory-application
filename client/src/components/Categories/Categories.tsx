import { useEffect, useState } from "react";
import type { Category } from "../../types/types";

const Categories = () => {
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/categories");
      const result = await res.json();
      setData(result.data);
    };

    fetchData();
  }, []);

  const items = data.map((item) => (
    <a key={item.id} href={item.name}>
      {item.name}
    </a>
  ));

  return <div>{items}</div>;
};

export default Categories;
