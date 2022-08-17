import React, { useEffect, useState } from "react";
import { Resume } from "../components/Resume";
import { useProductsMakert } from "../hooks/useProductsMakert";

export const Cart = () => {
  let controller = 1;
  const [localProducts, setLocalProducts] = useState<any>([]);
  const { productsMarket } = useProductsMakert();
  const [isError, setIsError] = useState(false);
  const getLocalProducts = () => {
    const getProducts = localStorage.getItem("products");
    if (!getProducts) setIsError(true);
    const parsedProducts = JSON.parse(getProducts as string);
    if (parsedProducts.length <= 0) setIsError(true);

    for (let i = 0; i < parsedProducts.length; i++) {
      const getKeys = Object.keys(parsedProducts[i]);
      const getId = getKeys[0].split("product")[1];
      const findProductById = productsMarket.find((data) => data.id == getId);

      setLocalProducts((localProducts: any) => [
        ...localProducts,
        {
          id: findProductById.id,
          description: findProductById.description,
          title: findProductById.title,
          price: findProductById.price,
          quantity: parsedProducts[i][`product${getId}`],
        },
      ]);
    }
  };
  useEffect(() => {
    if (controller === 1) {
      controller = 2;
      getLocalProducts();
    }
  }, [productsMarket]);

  useEffect(() => {}, [JSON.stringify(localProducts)]);
  return (
    <>{localProducts.length ? <Resume data={localProducts}></Resume> : null}</>
  );
};
