import React, { useEffect, useState } from "react";
interface Props {
  data: any[];
}
export const Resume = ({ data }: Props) => {
  const [total, setTotal] = useState(0);
  const getTotal = () => {
    let sumTotal = 0;
    data.map((product) => {
      sumTotal += product.price * Number(product.quantity);
    });
    setTotal(sumTotal);
  };
  useEffect(() => {
    getTotal();
  }, []);
  return (
    <div style={{ marginTop: 5 }}>
      <div className="flex justify-center">
        <h1 className="text-3xl font-black">Purchase summary</h1>
      </div>
      <div className="flex justify-center" style={{ marginTop: 5 }}>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="border">Name</th>
              <th className="border">Description</th>
              <th className="border">Price</th>
              <th className="border">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product.id}>
                <td className="border">{product.title}</td>
                <td className="border">{product.description}</td>
                <td className="border">{product.price}</td>
                <td className="border text-center">{product.quantity}</td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td className="border text-2xl">Total</td>
              <td className="border text-center text-xl">{total}$</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
