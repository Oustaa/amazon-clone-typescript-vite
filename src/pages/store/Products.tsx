import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import ProductsContainer from "../../components/products/ProductsContainer";
import { StyledContainer } from "../../styles";
import { ProductInterface } from "../../core/producTypes";

type setProductsType = (arg0: { value: []; loading: boolean }) => void;

async function getStoresProducts(id: string, cb: setProductsType) {
  const resp = await axios.get(
    `${import.meta.env.REACT_APP_BASE_URL}/products/store/${id}`
  );

  const products = await resp.data;

  cb({ value: products, loading: false });
}

const Products = () => {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<{
    value: ProductInterface[];
    loading: boolean;
  }>({ value: [], loading: true });

  useEffect(() => {
    getStoresProducts(id as string, setProducts);
  }, [id]);

  if (products.loading) return <Loader />;

  return (
    <StyledContainer>
      <ProductsContainer data={products} />
    </StyledContainer>
  );
};

export default Products;
