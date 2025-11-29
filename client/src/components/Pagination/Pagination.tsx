import styles from "./Pagination.module.scss";
import cls from "classnames";

interface PaginationProps {
  page: number;
  limit: number;
  totalCount: number;
  handleChange: (page: number) => void;
  loading: boolean;
}

export const Pagination = ({
  page,
  limit,
  totalCount,
  handleChange,
  loading,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / limit);

  const getMiddlePages = () => {
    const middlePages = [];

    // if current page has two previous pages and two next pages, include them in array
    for (let i = -2; i <= 2; i++) {
      if (page + i > 1 && page + i < totalPages) {
        middlePages.push(page + i);
      }
    }

    return middlePages;
  };

  const middlePages = getMiddlePages();

  const getNewPage = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLElement) {
      const newPage = Number(event.target.textContent);

      // validate number
      if (
        !isNaN(newPage) &&
        newPage >= 1 &&
        newPage <= totalPages &&
        page !== newPage
      ) {
        handleChange(newPage);
      }
    }
  };

  return (
    <div
      className={cls(styles.pagination, { [styles.disabled]: loading })}
      onClick={(e) => getNewPage(e)}
    >
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
