import { useState, useEffect, FC, Dispatch, SetStateAction } from "react";
import ProductsContainer from "../../components/products/ProductsContainer";
import axios from "axios";
import { Product } from "./Actions";
import { ProductInterface } from "../../core/producTypes";

async function getSuggestions(
  cb: Dispatch<SetStateAction<ProductInterface[]>>,
  body: {
    categories_id: string[];
    subcategories_id: string[];
    prodId: string;
  }
) {
  const resp = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}/products/suggestions/categories`,
    body
  );
  const data = await resp.data;

  cb(data);
}

const Suggestions: FC<{ product: Product }> = ({ product }) => {
  const [products, setProducts] = useState<ProductInterface[]>([]);

  useEffect(() => {
    getSuggestions(setProducts, {
      categories_id: product.categories_id,
      subcategories_id: product.subcategories_id,
      prodId: product._id,
    });
  }, [product._id, product.categories_id, product.subcategories_id]);

  return (
    <ProductsContainer title={"Suggested for you"} data={{ value: products }} />
  );
};

export default Suggestions;
