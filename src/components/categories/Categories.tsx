import React from "react";
import { StyledCategoriesContainer } from "../../styles/styled-categories";
import Category from "./Category";
import { useSelector } from "react-redux";

const Categories = () => {
  const categories = useSelector((state) => state.categories.value);
  return (
    <StyledCategoriesContainer>
      {categories.map((category) => (
        <Category key={category._id} {...category} />
      ))}
    </StyledCategoriesContainer>
  );
};

export default Categories;
