import React, { useEffect } from "react";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import { useProductsMakert } from "../hooks/useProductsMakert";
import { Cart } from "./Cart";

export const Home = () => {
  const { products, isLoading, isError } = useProducts();
  const { getProducts } = useProductsMakert();
  useEffect(() => {
    if (products.length) {
      getProducts(products);
    }
  }, [products]);
  return (
    <div className="flex items-center flex-col">
      {products.map((product: any) => (
        <ProductCard
          key={product.id.toString()}
          image={product.image}
          title={product.title}
          price={product.price}
          description={product.description}
          id={product.id}
        />
      ))}
    </div>
  );
};
