import { useEffect, useState } from "react";
import CartProducts from "./CartProducts";
import Loader from "../../components/Loader";
import { StyledContainer, FlexContainer } from "../../styles";
import { getCartProducts, getIds } from "../../features/cart-slice";
import SavedForLaterProducts from "./SavedForLaterProducts";
import CheckoutButton from "./CheckoutButton";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const StyledCart = styled.div`
  padding-block: var(--spacing-xxl);
`;

const Cart = () => {
  const dispatch = useAppDispatch();
  const [productsIds, setProductsIds] = useState([]);
  const { ids, products, savedLater, loading } = useAppSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(getIds());
    setProductsIds(JSON.parse(localStorage.getItem("cart_products")));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCartProducts());
  }, [dispatch, productsIds]);

  if (loading) return <Loader />;

  return (
    <StyledContainer>
      <StyledCart>
        <FlexContainer gap="var(--spacing-xl)" y="flex-start">
          <CartProducts ids={ids} products={products} />
          <CheckoutButton />
        </FlexContainer>
        <SavedForLaterProducts products={savedLater} />
      </StyledCart>
    </StyledContainer>
  );
};

export default Cart;
