import getSymbolFromCurrency from "currency-symbol-map";
import { FlexContainer, InputGroup, StyledButton } from "../../styles";
import styled from "styled-components";
import { FC, useState } from "react";
import { setIds } from "../../features/cart-slice";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useAppDispatch } from "../../store/hooks";

export interface Product {
  _id: string;
  store_id: string;
  title: string;
  price: number;
  currency: string;
  images: string[];
  specifications: any[];
  about: string[];
  reviewsOverview: ReviewsOverview;
  description: string;
  reviews: number;
  extra_images: any[];
  categories_id: string[];
  subcategories_id: string[];
  inserted_at: string;
  available: boolean;
  stock_Quantity: number;
  views: number;
  visits: number;
  QandA: any[];
  __v: number;
  store: string;
}

export interface ReviewsOverview {
  one: number;
  two: number;
  three: number;
  four: number;
  five: number;
}

const StyledCart = styled.div`
  position: sticky;
  top: 0;
  width: 20%;
  padding: var(--spacing-lg);
`;

const extraStyles = `
  & > * {
    width: 50%;
  }
`;

const Actions: FC<{ product: Product }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  function createOption(num: number) {
    const options = [];

    for (let index = 0; index < num; index++) {
      options.push(index + 1);
    }
    return options;
  }

  const addToCartHandler = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/cart/products`,
        [
          {
            product: product._id,
            qte: Number(quantity),
            price: product.price,
            store: product.store_id,
          },
        ],
        { headers: { Authorization: localStorage.getItem("token") } }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      dispatch(
        setIds({
          _id: product._id,
          qte: quantity,
          price: product.price,
          store: product.store_id,
        })
      );
    }
  };

  const addToWishListHandler = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/users/wishlist`,
        { wishlist: [product._id] },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);

      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      localStorage.setItem(
        "wishlist",
        JSON.stringify([product._id, ...wishlist])
      );
    }
  };

  return (
    <StyledCart>
      <h3>Buy it now:</h3>
      <InputGroup>
        <label htmlFor="qte">
          <h4>Quantity</h4>
        </label>
        <select
          value={quantity}
          onChange={(e) => setQuantity(+e.target.value)}
          id="qte"
        >
          {createOption(product.stock_Quantity).map((elem, i) => (
            <option key={i} value={elem}>
              {elem}
            </option>
          ))}
        </select>
        <FlexContainer>
          <h3>Total Price:</h3>
          <h3>
            {getSymbolFromCurrency(product.currency)}
            {(quantity * product?.price).toFixed(2)}
          </h3>
        </FlexContainer>
        <FlexContainer extraStyles={extraStyles}>
          <StyledButton onClick={addToCartHandler}>
            {loading ? (
              <ClipLoader size={12} color="var(--white)" />
            ) : (
              "Add to cart"
            )}
          </StyledButton>
          <StyledButton onClick={addToWishListHandler}>
            Add to wishlist
          </StyledButton>
        </FlexContainer>
        {/* <StyledButton extraStyles={`width: 100%;`}>Buy it now</StyledButton> */}
      </InputGroup>
    </StyledCart>
  );
};

export default Actions;
