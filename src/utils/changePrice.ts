import axios from "axios";

type convertPriceCurrencyProps = {
  from: string;
  to: string;
  value: number;
};

export const convertPriceCurrency = async (
  { from, to, value }: convertPriceCurrencyProps,
  cb: (value: number) => void
) => {
  const options = {
    method: "GET",
    url: "https://currency-converter-pro1.p.rapidapi.com/convert",
    params: {
      from: from,
      to: to,
      amount: value,
    },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_APP_RAPID_API_X_KEY,
      "X-RapidAPI-Host": "currency-converter-pro1.p.rapidapi.com",
    },
  };

  try {
    if (from === to) {
      cb(value);
    } else {
      const response = await axios.request(options);
      const data = await response.data;
      cb(data.result);
    }
  } catch (error) {
    console.error(error);
  }
};
