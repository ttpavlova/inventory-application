import { useSearchParams } from "react-router-dom";
import { useGetShoesQuery } from "../../hooks/useGetShoesQuery";
import { Menu } from "../Menu/Menu";
import ShoeCard from "./ShoeCard";
import styles from "./Shoes.module.scss";
import { Pagination } from "../Pagination/Pagination";
import { useEffect, useState } from "react";

const Shoes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")));

  const { isPending, error, data /* , isFetching */ } = useGetShoesQuery(page);

  useEffect(() => {
    setSearchParams({ page: String(page) });
  }, [page]);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const changePage = (page: number) => {
    setPage(page);
  };

  return (
    <div className={styles.mainContainer}>
      <Menu />

      <div className={styles.wrapper}>
        {data?.data && data.data.length !== 0 ? (
          <>
            <div className={styles.shoesContainer}>
              {data.data.map((shoe) => (
                <ShoeCard key={shoe.id} shoe={shoe} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div>"No shoes found!"</div>
          </>
        )}
        {data?.data && (
          <Pagination
            page={page}
            totalItems={data.totalItems}
            handleChange={changePage}
          />
        )}
      </div>
    </div>
  );
};

export default Shoes;
