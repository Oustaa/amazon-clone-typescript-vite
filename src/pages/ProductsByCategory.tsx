import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ProductsCategory from "../components/ProductsCategory";
import { StyledContainer } from "../styles";
import styled from "styled-components";

export interface ProductsByCategory {
  _id: string;
  products: Product[];
}

export interface Product {
  _id: string;
  title: string;
  price: number;
  images: string[];
  store: string;
}

type StateType = {
  value: ProductsByCategory[];
  loading: boolean;
};

const StyledSubProduct = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
  margin-block: var(--spacing-xxl);
`;

async function getProductsByCategories(
  id: string,
  cb: (arg0: StateType) => void
) {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/products/category/${id}`
  );

  const data = await response.data;

  cb({ value: data, loading: false });
}

const ProductsByCategory = () => {
  const [products, setProducts] = useState<StateType>({
    value: [],
    loading: true,
  });
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setProducts({ value: [], loading: true });
    getProductsByCategories(id as string, setProducts);
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
