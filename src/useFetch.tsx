import { useState, useEffect, useCallback } from 'react';
import { CoinType } from './Types';

interface FetchDataType {
  data: any; //todo
  isLoading: boolean;
  isError: boolean;
}

export const useFetch = (url: string): FetchDataType => {
  //Loading state
  const [isLoading, setIsLoading] = useState(true);
  //Error state
  const [isError, setIsError] = useState(false);

  const [data, setData] = useState<string[] | CoinType[]>([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();

      setData(data);

      //Disable loading screen
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }, [url]);
  useEffect(() => {
    fetchData();
  }, [url, fetchData]);

  return { data, isLoading, isError };
};
