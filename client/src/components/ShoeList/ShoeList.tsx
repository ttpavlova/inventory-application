import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetAllShoes } from "../../hooks/list";
import ShoeCard from "../ShoeCard/ShoeCard";
import { Pagination } from "../Pagination/Pagination";
import styles from "./ShoeList.module.scss";

export const ShoeList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage =
    searchParams.get("page") == null ? 1 : Number(searchParams.get("page"));
  const [page, setPage] = useState(initialPage);
  const limit = 5;

  const { data, loading, error } = useGetAllShoes(page, limit);

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
    <div className={styles.list}>
      {data && data.items.length !== 0 ? (
        <>
          <div className={styles.cards}>
            {data.items.map((item) => (
              <ShoeCard key={item.id} shoe={item} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div>No shoes found</div>
        </>
      )}
      {data && (
        <Pagination
          page={page}
          limit={limit}
          totalCount={data.totalCount}
          handleChange={changePage}
        />
      )}
    </div>
  );
};
