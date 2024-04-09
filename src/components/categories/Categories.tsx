import { useAppSelector } from "../../store/hooks";
import { StyledCategoriesContainer } from "../../styles/styled-categories";
import Category from "./Category";

const Categories = () => {
  const categories = useAppSelector((state) => state.categories.value);
  return (
    <StyledCategoriesContainer>
      {categories.map((category) => (
        <Category key={category._id} {...category} />
      ))}
    </StyledCategoriesContainer>
  );
};

export default Categories;
