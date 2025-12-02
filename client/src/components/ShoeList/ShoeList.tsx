import { useSearchParams } from "react-router-dom";
import { useGetAllShoes } from "../../hooks/list";
import ShoeCard from "../ShoeCard/ShoeCard";
import { Pagination } from "../Pagination/Pagination";
import styles from "./ShoeList.module.scss";
import { ShoeListSkeleton } from "../Skeletons/ShoeListSkeleton/ShoeListSkeleton";

export const ShoeList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const limit = 5;
  const categories = searchParams.get("categories") ?? null;

  const { data, loading, error } = useGetAllShoes(page, limit, categories);

  if (error) {
    return <span>Something went wrong. Try again later</span>;
  }

  const changePage = (page: number) => {
    if (page === 1) {
      setSearchParams((searchParams) => {
        searchParams.delete("page");
        return searchParams;
      });
    } else {
      setSearchParams((searchParams) => {
        searchParams.set("page", String(page));
        return searchParams;
      });
    }
  };

  return (
    <div className={styles.list}>
      {loading && <ShoeListSkeleton />}

      {!loading && data && data.items.length !== 0 && (
        <div className={styles.cards}>
          {data.items.map((item) => (
            <ShoeCard key={item.id} shoe={item} />
          ))}
        </div>
      )}

      {data && data.items.length === 0 && <div>No shoes found</div>}

      {data && (
        <Pagination
          page={page}
          limit={limit}
          totalCount={data.totalCount}
          handleChange={changePage}
          loading={loading}
        />
      )}
    </div>
  );
};
