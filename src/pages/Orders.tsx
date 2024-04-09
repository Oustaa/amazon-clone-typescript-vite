import React from "react";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import { StyledContainer } from "../styles";
import Table from "../components/table/Table";
import getSymbolFromCurrency from "currency-symbol-map";

import styled from "styled-components";

const StyledOrders = styled.div`
  padding-block: var(--spacing-xl);

  h2 {
    margint-bottom: var(--spacing-lg);
  }
`;

const request = {
  url: `${process.env.REACT_APP_BASE_URL}/orders/user`,
  config: {
    headers: { Authorization: localStorage.getItem("token") },
  },
};

const OrdersHeaders = {
  "Order Ref": { value: "_id" },
  Items: {
    checked: true,
    check: (data) => {
      return data.items.length;
    },
  },
  "Total Price": {
    checked: true,
    check: (data) => {
      return (
        getSymbolFromCurrency(data.currency) + data.total["$numberDecimal"]
      );
    },
  },
  State: { value: "state" },
  "Order On": { type: "date", value: "createdAt" },
};

const Orders = () => {
  const { data: orders, loading } = useFetch(request);
  if (loading) return <Loader />;
  console.log(orders);
  return (
    <StyledContainer>
      <StyledOrders>
        <h2>Your Orders</h2>
        <Table data={orders} headers={OrdersHeaders} />
      </StyledOrders>
    </StyledContainer>
  );
};

export default Orders;
