import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <div>
      <Link to="/shoes">Shoe List</Link>
      <Link to="/categories">Categories</Link>
      <Link to="/new-shoe">Add a Shoe</Link>
    </div>
  );
};
