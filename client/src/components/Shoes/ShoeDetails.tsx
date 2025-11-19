import { useParams } from "react-router-dom";
import styles from "./ShoeDetails.module.scss";
import { useGetShoeByIdQuery } from "../../hooks/useGetShoeByIdQuery";

export const ShoeDetails = () => {
  const { id: paramId } = useParams();

  const { isPending, error, data: shoe } = useGetShoeByIdQuery(String(paramId));

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  if (!shoe) return "Shoe not found";

  const fieldsToShow = [
    "category",
    "gender",
    "season",
    "brand",
    "material",
    "color",
    "country",
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
