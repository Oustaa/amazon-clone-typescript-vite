import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductsContainer from "../components/products/ProductsContainer";
import axios from "axios";
import Loader from "../components/Loader";
import { StyledContainer } from "../styles";
import { ProductInterface } from "../core/producTypes";

type StateType = {
  value: ProductInterface[];
  loading: boolean;
};

async function getProductsBySubCategories(
  id: string,
  cb: (args0: StateType) => void
) {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/products/subcategory/${id}`
  );

  const data = await response.data;

  cb({ value: data, loading: false });
}

const ProductsSubByCategory = () => {
  const [products, setProducts] = useState<StateType>({
    value: [],
    loading: true,
  });
  const { id } = useParams();

  useEffect(() => {
    setProducts({ value: [], loading: true });
    getProductsBySubCategories(id as string, setProducts);
  }, [id]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  if (products.loading) return <Loader />;

  return (
    <StyledContainer>
      <ProductsContainer data={products} />
    </StyledContainer>
  );
};

export default ProductsSubByCategory;
