import styled from "styled-components";
import { setCurrency } from "../../../features/auth-slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { ChangeEvent } from "react";

const StyledCurrency = styled.div`
  padding-block: var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: center;

  h4 {
    color: white;
    margin-right: var(--spacing-lg);
  }
`;

const CURRENCIES = [
  "SGD",
  "MYR",
  "EUR",
  "USD",
  "AUD",
  "JPY",
  "CNH",
  "HKD",
  "CAD",
  "INR",
  "DKK",
  "GBP",
  "RUB",
  "NZD",
  "MXN",
  "IDR",
  "TWD",
  "THB",
  "VND",
  "MAD",
];

const Currency = () => {
  const dispatch = useAppDispatch();
  const currency = useAppSelector((state) => state.auth.currency);

  const currencyChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCurrency(e.target.value));
    localStorage.setItem("currency", e.target.value);
  };

  return (
    <StyledCurrency>
      <h4>Change Your Browsing Currency:</h4>
      <select
        onChange={currencyChangeHandler}
        value={currency || localStorage.getItem("currency") || "USD"}
      >
        {CURRENCIES.map((currency) => (
          <option value={currency}>{currency}</option>
        ))}
      </select>
    </StyledCurrency>
  );
};

export default Currency;
