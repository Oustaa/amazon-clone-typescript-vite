import { useState, useEffect, FC, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Images from "./Images";
import Info from "./Info";
import Actions, { Product } from "./Actions";
import axios from "axios";
import { StyledContainer } from "../../styles";
import Questions from "./Questions";
import Suggestions from "./Suggestions";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { getIds } from "../../features/cart-slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

type DisplayProductState =
  | {
      loading: true;
    }
  | {
      loading: false;
      value: Product;
      error?: Error;
    };

type DisplayProductProps = {
  width?: string;
};

type getPriceProps = {
  from: string;
  to: string;
  value: number;
};

async function getPrice({ from, to, value }: getPriceProps) {
  const options = {
    method: "GET",
    url: "https://currency-converter-pro1.p.rapidapi.com/convert",
    params: {
      from: from,
      to: to,
      amount: value,
    },
    headers: {
      "X-RapidAPI-Key": "f8cdae9dd3msh8dcbc3f61ded3cep1d39d9jsn33b92ef93b96",
      "X-RapidAPI-Host": "currency-converter-pro1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return await response.data;
  } catch (error) {
    console.error(error);
  }
}

async function getProduct(
  id: string,
  cb: Dispatch<SetStateAction<DisplayProductState>>,
  userCurrency: string
) {
  cb({ loading: true });
  const resp = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/products/${id}`
  );

  const data = await resp.data;

  const toCurrency = userCurrency || localStorage.getItem("currency") || "USD";

  if (data.currency !== toCurrency) {
    const priceConvert = await getPrice({
      from: data.currency,
      to: toCurrency,
      value: data.price,
    });

    data.price = priceConvert.result;
    data.currency = toCurrency;
  }

  cb({ value: data, loading: false });
}

const StyledDisplayProduct = styled.div<{ width?: string }>`
  display: flex;
  gap: var(--spacing-xxl);
  position: relative;
  width: ${({ width }) => width || "100%"};
  height: calc(100% - 80px);
  padding-right: 5px;
  margin-block: var(--spacing-xxl);
`;

const DisplayProduct: FC<DisplayProductProps> = ({ width }) => {
  const userCurrency = useAppSelector((state) => state.auth.currency);
  const dispatch = useAppDispatch();
  const id = useParams<{ id: string }>().id!;

  const [product, setProduct] = useState<DisplayProductState>({
    loading: true,
  });

  useEffect(() => {
    dispatch(getIds());
  }, [dispatch]);

  useEffect(() => {
    getProduct(id, setProduct, userCurrency);

    const visitsArray = JSON.parse(localStorage.getItem("visits") || "[]");
    localStorage.setItem(
      "visits",
      JSON.stringify(new Array(...new Set([id, ...visitsArray])))
    );
  }, [id, userCurrency]);

  if (product.loading === true) return <Loader />;

  if (product.loading === false && !product?.error)
    return <h2>SOme unexpected error ocure</h2>;

  return (
    <StyledContainer>
      <StyledDisplayProduct width={width}>
        <Images product={product.value} />
        <Info product={product.value} />
        <Actions product={product.value} />
      </StyledDisplayProduct>
      <hr />
      <Questions product={product.value} />
      <hr />
      <Suggestions product={product.value} />
    </StyledContainer>
  );
};

export default DisplayProduct;
