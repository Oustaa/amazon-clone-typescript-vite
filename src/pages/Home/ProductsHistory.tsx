import axios from "axios";
import React, { useState, useEffect } from "react";
import ProductsContainer from "../../components/products/ProductsContainer";
import { ProductInterface } from "../../core/producTypes";

async function getLatestProduct(
  cb: (args0: { value: ProductInterface[]; loading: boolean }) => void,
  ids: string[]
) {
  const resp = await axios.post(
    `${import.meta.env.REACT_APP_BASE_URL}/products/ids`,
    {
      ids,
    }
  );
  const data: ProductInterface[] = await resp.data;
  const sorteddata = ids.map((id) => {
    return data.find(({ _id }) => _id === id);
  });

  cb({ value: sorteddata || [], loading: false });
}

const LatestUploaded = () => {
  const [latest, setLatest] = useState<{
    value: ProductInterface[];
    loading: boolean;
  }>({ value: [], loading: false });

  useEffect(() => {
    setLatest({ value: [], loading: true });
    if (JSON.parse(localStorage.getItem("visits") || "{}"))
      getLatestProduct(
        setLatest,
        JSON.parse(localStorage.getItem("visits") || "{}")
      );
  }, []);

  if (!localStorage.getItem("visits")) return;

  return latest.value ? (
    <ProductsContainer
      numProd={6}
      title="Your Browsing History"
      data={latest}
      titleLong={40}
    />
  ) : null;
};

export default LatestUploaded;
