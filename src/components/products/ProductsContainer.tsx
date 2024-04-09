import ProductCard from "./ProductCard";
import {
  StyledProducts,
  StyledProductsContainer,
} from "../../styles/styled-product";
import Loader from "../Loader";

type ProductsContainerProps<T> = {
  title?: string;
  numProd?: number;
  titleLong?: number;
  data: T;
};

const ProductsContainer = <T,>({
  title,
  data,
  numProd,
  titleLong,
}: ProductsContainerProps<{ value: T[]; loading?: boolean }>) => {
  const products = data?.value;

  return (
    <StyledProducts>
      <header>
        <h2>{title}</h2>
      </header>
      {data?.loading ? (
        <Loader height={"300px"} />
      ) : (
        <StyledProductsContainer numProd={numProd}>
          {products?.map((product) => (
            <ProductCard titleLong={titleLong} key={product._id} {...product} />
          ))}
        </StyledProductsContainer>
      )}
    </StyledProducts>
  );
};

export default ProductsContainer;
