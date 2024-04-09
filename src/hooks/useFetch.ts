import axios from "axios";
import { useEffect, useState } from "react";

type useFetchProps = {
  url: string;
  config: any;
};

const useFetch = <T>({ url, config }: useFetchProps) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | any>(null);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const resp = await axios({ url, ...config });

        const data = await resp.data;

        setData(data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [url, config]);

  return { data, loading, error };
};

export default useFetch;
