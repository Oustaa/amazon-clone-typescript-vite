import { useState, useEffect, SetStateAction } from "react";
import ProductsContainer from "../../components/products/ProductsContainer";
import axios from "axios";
import { ProductInterface } from "../../core/producTypes";

type StateType = {
  value: ProductInterface[];
  loading: boolean;
};

async function getProducts(cb: (arg0: SetStateAction<StateType>) => void) {
  const resp = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/products/latest`
  );
  const data = await resp.data;

  cb({ value: data, loading: false });
}

const LatestUploaded = () => {
  const [latest, setLatest] = useState<StateType>({
    value: [],
    loading: false,
  });

  useEffect(() => {
    setLatest({ value: [], loading: true });
    getProducts(setLatest);
  }, []);

  return <ProductsContainer title="Latest uploaded items" data={latest} />;
};

export default LatestUploaded;
