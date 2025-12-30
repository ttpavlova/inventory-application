import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./ShoeDetails.module.scss";
import { useDeleteShoe, useGetShoeById } from "../../hooks/list";
import { NotFound } from "../NotFound/NotFound";
import { ShoeDetailsSkeleton } from "../../components/Skeletons/ShoeDetailsSkeleton/ShoeDetailsSkeleton";
import { getImage } from "../../helpers/getImage";

export const ShoeDetails = () => {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  const { data: shoe, loading, error } = useGetShoeById(Number(paramId));
  const {
    // loading: loadingDelete,
    // error: errorDelete,
    request: deleteShoe,
  } = useDeleteShoe(Number(paramId));

  if (loading) {
    return <ShoeDetailsSkeleton />;
  }

  if (error) {
    return <span>Something went wrong. Try again later</span>;
  }

  if (!shoe) {
    return <NotFound />;
  }

  const fieldsToShow = [
    "id",
    "category",
    "gender",
    "season",
    "brand",
    "material",
    "color",
  ] as const;

  const descriptionList = fieldsToShow.map((field) => (
    <p key={field}>
      <span className={styles.descriptionTitle}>{field}</span>:{" "}
      {typeof shoe[field] === "object" ? shoe[field].name : shoe[field]}
    </p>
  ));

  const handleDelete = () => {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete a shoe with ID: ${paramId}?`
    );
    if (shouldDelete) {
      deleteShoe();
      navigate("/shoes");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        {descriptionList}

        <div className={styles.buttons}>
          <Link to={`/shoes/update/${paramId}`} className={styles.btn}>
            Edit
          </Link>
          <button className={styles.btn} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      <div className={styles.coverContainer}>
        <img
          src={getImage(shoe.gender, shoe.category.name, shoe.brand.name)}
          alt={`${shoe.category} ${shoe.brand}`}
          className={styles.cover}
        />
      </div>
    </div>
  );
};
