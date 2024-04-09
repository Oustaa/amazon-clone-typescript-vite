import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ProductsCategory from "../components/ProductsCategory";
import { StyledContainer } from "../styles";
import styled from "styled-components";

const StyledSubProduct = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
  margin-block: var(--spacing-xxl);
`;

async function getProductsByCategories(id, cb) {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/products/category/${id}`
  );

  const data = await response.data;

  cb({ value: data, loading: false });
}

const ProductsByCategory = () => {
  const [products, setProducts] = useState({ value: [], loading: true });
  const { id } = useParams();

  useEffect(() => {
    setProducts({ value: [], loading: true });
    getProductsByCategories(id, setProducts);
  }, [id]);

  if (products.loading) return <Loader />;

  return (
    <StyledContainer>
      <StyledSubProduct>
        {products.value.map((prodsCat) => (
          <ProductsCategory key={prodsCat._id} data={prodsCat} />
        ))}
      </StyledSubProduct>
    </StyledContainer>
  );
};

export default ProductsByCategory;
