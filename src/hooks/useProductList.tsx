import React, {useEffect, useState} from 'react';

const API_LIMIT = 10;
const API_END_POINT = {
  product: '/products',
};
const API_URL = 'https://dummyjson.com';

export const useProductList = () => {
  const [productListData, setProductListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [isAllDataLoaded, setAllDataLoaded] = useState(false);

  const fetchProductList = async (skipVal: number) => {
    try {
      const finalUrl =
        API_URL +
        API_END_POINT.product +
        '?limit=' +
        API_LIMIT +
        '&skip=' +
        skipVal;

      const productListFromAPI = await fetch(finalUrl);
      const jsonRes = await productListFromAPI.json();
      setIsLoading(false);
      if (jsonRes.products.length === 0) {
        setAllDataLoaded(true);
      }
      setProductListData(prevData => {
        return [...prevData, ...jsonRes.products];
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getNextSetOfData = () => {
    const updatedSkip = skip + API_LIMIT;
    fetchProductList(updatedSkip).then(() => {
      setSkip(updatedSkip);
    });
  };

  useEffect(() => {
    fetchProductList(skip);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {productListData, isAllDataLoaded, getNextSetOfData, isLoading};
};
