import styles from "./Pagination.module.scss";

interface PaginationProps {
  page: number;
  totalItems: number;
  handleChange: (page: number) => void;
}

export const Pagination = ({
  page,
  totalItems,
  handleChange,
}: PaginationProps) => {
  const limit = 2;
  const totalPages = Math.ceil(totalItems / limit);

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
    <div className={styles.wrapper} onClick={(e) => getNewPage(e)}>
      <ul className={styles.pages}>
        <li className={styles.page}>
          <a rel="nofollow">{1}</a>
        </li>
        {page - 2 > 2 && (
          <li className={styles.page}>
            <a rel="nofollow">{"..."}</a>
          </li>
        )}

        {middlePages.map((page) => (
          <li key={page} className={styles.page}>
            <a rel="nofollow">{page}</a>
          </li>
        ))}

        {page + 2 < totalPages - 1 && (
          <li className={styles.page}>
            <a rel="nofollow">{"..."}</a>
          </li>
        )}
        {totalPages !== 1 && (
          <li className={styles.page}>
            <a rel="nofollow">{totalPages}</a>
          </li>
        )}
      </ul>
    </div>
  );
};
