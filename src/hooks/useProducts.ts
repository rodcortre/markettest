import { useCallback, useEffect, useState } from "react";
import { useFetch } from "./useFetch";

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const { isError, isLoading, refetch, data } = useFetch();
    const getProducts = useCallback(() => {
      refetch(`https://serversalinas.herokuapp.com/products`);
    }, []);
    useEffect(() => {
      getProducts();
    }, []);
    useEffect(() => {
      if (data) {
        if (data.products?.length) {
          setProducts(data.products);
        }
      }
    }, [data]);
  

    return {
        isError,products,isLoading
    }
}