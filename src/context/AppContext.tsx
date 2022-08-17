import { createContext } from "react";
import { TodoState } from "../interfaces/interfaces";
export type TodoContextProps = {
  auth: boolean;
  isAuth: (auth: boolean) => void;
  cartUpdate: number;
  isCartUpdate: (newNumber: number) => void;
  productsMarket: any[];
  getProducts: (products: any[]) => void;
};
export const AppContext = createContext<TodoContextProps>(
  {} as TodoContextProps
);
