import React, { useEffect, useState } from "react";
import { useCartUpdate } from "../hooks/useCartUpdate";
interface Props {
  image: string;
  title: string;
  price: number;
  description: string;
  id: number;
}
export const ProductCard = ({
  image,
  title,
  price,
  description,
  id,
}: Props) => {
  const { isCartUpdate } = useCartUpdate();
  const [values, setValues] = useState({
    [`product${id}`]: "",
  });
  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  };
  const handleAdd = () => {
    const getHistoryProducts = localStorage.getItem("products");
    if (!getHistoryProducts) {
      localStorage.setItem(
        "products",
        JSON.stringify([{ [`product${id}`]: values[`product${id}`] }])
      );
      isCartUpdate(Number(values[`product${id}`]));
    } else {
      const parsedProducts = JSON.parse(getHistoryProducts);
      const indexProduct = parsedProducts.findIndex((product: any) => {
        const getKeys = Object.keys(product);
        if (getKeys[0] === `product${id}`) {
          return true;
        }
      });
      if (indexProduct < 0) {
        parsedProducts.push({
          [`product${id}`]: values[`product${id}`],
        });
      } else {
        parsedProducts[indexProduct] = {
          [`product${id}`]: values[`product${id}`],
        };
      }
      let sum = 0;
      for (let i = 0; i < parsedProducts.length; i++) {
        const getKeys = Object.keys(parsedProducts[i]);
        sum += Number(parsedProducts[i][getKeys[0]]);
      }
      localStorage.setItem("products", JSON.stringify(parsedProducts));
      isCartUpdate(sum);
    }
  };
  const handleRemove = () => {
    const getHistoryProducts = localStorage.getItem("products");
    if (!getHistoryProducts) {
      isCartUpdate(0);
      setValues({
        [`product${id}`]: "0",
      });
    } else {
      const parsedProducts = JSON.parse(getHistoryProducts);
      const indexProduct = parsedProducts.findIndex((product: any) => {
        const getKeys = Object.keys(product);
        if (getKeys[0] === `product${id}`) {
          return true;
        }
      });
      if (indexProduct < 0) {
      } else {
        parsedProducts.splice(indexProduct, 1);
      }
      let sum = 0;
      for (let i = 0; i < parsedProducts.length; i++) {
        const getKeys = Object.keys(parsedProducts[i]);
        sum += Number(parsedProducts[i][getKeys[0]]);
      }
      localStorage.setItem("products", JSON.stringify(parsedProducts));
      isCartUpdate(sum);
      setValues({ [`product${id}`]: "0" });
    }
  };
  useEffect(() => {
    const getHistoryProducts = localStorage.getItem("products");
    if (!getHistoryProducts) {
      setValues({ [`product${id}`]: "0" });
    } else {
      const parsedProducts = JSON.parse(getHistoryProducts);
      const indexProduct = parsedProducts.findIndex((product: any) => {
        const getKeys = Object.keys(product);
        if (getKeys[0] === `product${id}`) {
          return true;
        }
      });
      if (indexProduct < 0) {
        setValues({ [`product${id}`]: "0" });
      } else {
        setValues(parsedProducts[indexProduct]);
      }
    }
  }, []);
  return (
    <div
      className="mt-4 border-4 rounded shadow-2xl border-white"
      style={{ width: "50%", padding: 5 }}
    >
      <img className="object-cover h-48 w-96" src={image}></img>
      <div>
        <h1 className="text-2xl">Name:</h1>
        <h1>{title}</h1>
      </div>
      <div>
        <h1 className="text-2xl">Description:</h1>
        <h1>{description}</h1>
      </div>
      <div>
        <h1 className="text-2xl">Price:</h1>
        <h1>{price}</h1>
      </div>
      <div className="flex justify-center">
        <input
          type="number"
          onChange={onHandleChange}
          name={`product${id}`}
          min="0"
          max="100"
          value={values[`product${id}`]}
        />
        <button
          onClick={handleAdd}
          className="rounded"
          style={{
            background: "#287233",
            color: "white",
            width: 40,
            height: 40,
          }}
        >
          +
        </button>
        <button
          onClick={handleRemove}
          className="rounded"
          style={{
            background: "red",
            color: "white",
            width: 40,
            height: 40,
            marginLeft: 2,
          }}
        >
          -
        </button>
      </div>
    </div>
  );
};
