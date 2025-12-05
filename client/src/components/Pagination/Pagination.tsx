import { usePagination } from "./hooks/usePagination";
import styles from "./Pagination.module.scss";
import cls from "classnames";

interface PaginationProps {
  page: number;
  limit: number;
  totalCount: number;
  handleChange: (page: number) => void;
}

export const Pagination = ({
  page,
  limit,
  totalCount,
  handleChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / limit);

  const { middlePages, getNewPage } = usePagination(
    page,
    totalPages,
    handleChange
  );

  return (
    <div className={styles.pagination} onClick={(e) => getNewPage(e)}>
      <ul className={styles.pages}>
        <li
          className={cls(styles.page, {
            [styles.current]: page === 1,
          })}
        >
          <a rel="nofollow">{1}</a>
        </li>
        {page - 2 > 2 && (
          <li className={cls(styles.page, styles.disabled)}>
            <a rel="nofollow">{"..."}</a>
          </li>
        )}

        {middlePages.map((number) => (
          <li
            key={number}
            className={cls(styles.page, {
              [styles.current]: number === page,
            })}
          >
            <a rel="nofollow">{number}</a>
          </li>
        ))}

        {page + 2 < totalPages - 1 && (
          <li className={cls(styles.page, styles.disabled)}>
            <a rel="nofollow">{"..."}</a>
          </li>
        )}
        {totalPages !== 1 && (
          <li
            className={cls(styles.page, {
              [styles.current]: page === totalPages,
            })}
          >
            <a rel="nofollow">{totalPages}</a>
          </li>
        )}
      </ul>
    </div>
  );
};
