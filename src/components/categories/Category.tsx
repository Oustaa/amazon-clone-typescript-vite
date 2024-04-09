import { FC } from "react";
import { StyledCategory } from "../../styles/styled-categories";
import { Link } from "react-router-dom";

interface CategoryProps {
  name: string;
  _id: string;
  image: string;
}

const Category: FC<CategoryProps> = ({ name, _id, image }) => {
  return (
    <Link to={`/products/${_id}`}>
      <StyledCategory>
        <div className="img">
          <img
            crossOrigin="anonymous"
            src={`${
              import.meta.env.VITE_APP_BASE_URL
            }/images/categories/${image}`}
            alt={name}
          />
        </div>
        <h2>{name}</h2>
      </StyledCategory>
    </Link>
  );
};

export default Category;
