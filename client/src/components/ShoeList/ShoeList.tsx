import { useSearchParams } from "react-router-dom";
import { useGetAllShoes } from "../../hooks/useShoesApi";
import ShoeCard from "../ShoeCard/ShoeCard";
import { Pagination } from "../Pagination/Pagination";
import styles from "./ShoeList.module.scss";
import { ShoeListSkeleton } from "../Skeletons/ShoeListSkeleton/ShoeListSkeleton";

export const ShoeList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page =
    searchParams.get("page") == null ? 1 : Number(searchParams.get("page"));
  const limit = 10;
  const categories = searchParams.get("categories") ?? null;

  const { data, loading, error } = useGetAllShoes(page, limit, categories);

  const changePage = (page: number) => {
    setSearchParams((searchParams) => {
      if (page === 1) {
        searchParams.delete("page");
      } else {
        searchParams.set("page", String(page));
      }

      return searchParams;
    });
  };

  if (loading) {
    return <ShoeListSkeleton />;
  }

  if (error) {
    return <span>Something went wrong. Try again later</span>;
  }

  if (data && data.items.length === 0) {
    return <div>No shoes found</div>;
  }

  return (
    <div className={styles.list}>
      {data && data.items.length !== 0 && (
        <>
          <div className={styles.cards}>
            {data.items.map((item) => (
              <ShoeCard key={item.id} shoe={item} />
            ))}
          </div>

          <Pagination
            page={page}
            limit={limit}
            totalCount={data.totalCount}
            handleChange={changePage}
          />
        </>
      )}
    </div>
  );
};
