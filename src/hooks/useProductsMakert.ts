import { useContext } from "react"
import { AppContext } from "../context/AppContext"

export const useProductsMakert = () => {
    const {productsMarket,getProducts} = useContext(AppContext)
    return{
        productsMarket,getProducts
    }
}