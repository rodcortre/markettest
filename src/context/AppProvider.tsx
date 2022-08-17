import { useReducer } from "react";
import { TodoState } from "../interfaces/interfaces";
import { AppContext } from "./AppContext";
import { appReducer } from "./appReducer";

const INITIAL_STATE: TodoState = {
  auth: false,
  cartUpdate: 0,
  productsMarket: [],
};

interface Props {
  children: JSX.Element | JSX.Element[]; //definir si es un elemento o varios
}
export const AppProvider = ({ children }: Props) => {
  //ese value es lo que vamos a retornar para todos los componentes que usaran el context para obtener los elementos y estados
  const [auth, dispatch] = useReducer(appReducer, INITIAL_STATE);
  const handleAuth = (isAuth: boolean) => {
    dispatch({
      type: "auth",
      payload: isAuth,
    });
  };

  const handleCartupdate = (newNumber: number) => {
    dispatch({
      type: "cartUpdate",
      payload: newNumber,
    });
  };

  const handleProducts = (products: any[]) => {
    dispatch({
      type: "products",
      payload: products,
    });
  };
  return (
    <AppContext.Provider
      value={{
        auth: auth.auth,
        isAuth: handleAuth,
        cartUpdate: auth.cartUpdate,
        isCartUpdate: handleCartupdate,
        productsMarket: auth.productsMarket,
        getProducts: handleProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
