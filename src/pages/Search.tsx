import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { StyledContainer } from "../styles";
import Loader from "../components/Loader";
import ProductsContainer from "../components/products/ProductsContainer";
import { ProductInterface } from "../core/producTypes";

type searchResult = { value: ProductInterface[]; loading: boolean };

async function getProducts(query: string, cb: (arg0: searchResult) => void) {
  const response = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/products/search?q=${query}`
  );

  const data = await response.data;
  console.log(data);
  cb({ value: data, loading: false });
}

const Search = () => {
  const [products, setProducts] = useState<searchResult>({
    value: [],
    loading: true,
  });
  const { query } = useParams<{ query: string }>();

  useEffect(() => {
    setProducts({ value: [], loading: true });
    getProducts(query as string, setProducts);
  }, [query]);

  if (products.loading) return <Loader />;

  return (
    <StyledContainer>
      <ProductsContainer
        // @ts-expect-error this is not an error replaceAll indead is
        title={`Search result for: ${query?.replaceAll("%20", " ")}`}
        data={products}
      />
    </StyledContainer>
  );
};

export default Search;
