import { useParams } from "react-router-dom";
import styles from "./ShoeDetails.module.scss";
import { useApi } from "../../hooks/useApi";
import type { ShoeView } from "../../types/types";

export const ShoeDetails = () => {
  const { id: paramId } = useParams();

  const {
    data: shoe,
    loading,
    error,
  } = useApi<ShoeView>(`/api/shoes/${paramId}`);

  if (loading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Something went wrong. Try again later</span>;
  }

  if (!shoe) {
    return <span>Shoe not found</span>;
  }

  const fieldsToShow = [
    "category",
    "gender",
    "season",
    "brand",
    "material",
    "color",
  ];

  const descriptionList = fieldsToShow.map((field) => (
    <p key={field}>
      <span className={styles.descriptionTitle}>{field}</span>:{" "}
      {shoe[field as keyof typeof shoe]}
    </p>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <p>Title</p>
        {descriptionList}
      </div>
      <div className={styles.coverContainer}>
        <img alt="shoe cover" className={styles.cover} />
      </div>
    </div>
  );
};
