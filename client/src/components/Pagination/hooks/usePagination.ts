export const usePagination = (
  page: number,
  totalPages: number,
  handleChange: (page: number) => void
) => {
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

  return { middlePages, getNewPage };
};
