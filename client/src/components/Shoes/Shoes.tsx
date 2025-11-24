import { useSearchParams } from "react-router-dom";
import { Menu } from "../Menu/Menu";
import ShoeCard from "./ShoeCard";
import styles from "./Shoes.module.scss";
import { Pagination } from "../Pagination/Pagination";
import { useEffect, useState } from "react";
import type { ShoeView } from "../../types/types";
import { useApiShoes } from "../../hooks/useApiShoes";

const Shoes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage =
    searchParams.get("page") == null ? 1 : Number(searchParams.get("page"));
  const [page, setPage] = useState(initialPage);
  const limit = 5;

  const { items, totalCount, loading, error } = useApiShoes<ShoeView[]>(
    `/api/shoes/?page=${page}&limit=${limit}`
  );

  useEffect(() => {
    setSearchParams({ page: String(page) });
  }, [page]);

  if (loading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Something went wrong. Try again later</span>;
  }

  const changePage = (page: number) => {
    setPage(page);
  };

  return (
    <div className={styles.mainContainer}>
      <Menu />

      <div className={styles.wrapper}>
        {items && items.length !== 0 ? (
          <>
            <div className={styles.shoesContainer}>
              {items.map((item) => (
                <ShoeCard key={item.id} shoe={item} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div>No shoes found</div>
          </>
        )}
        {items && totalCount && (
          <Pagination
            page={page}
            limit={limit}
            totalCount={totalCount}
            handleChange={changePage}
          />
        )}
      </div>
    </div>
  );
};

export default Shoes;
