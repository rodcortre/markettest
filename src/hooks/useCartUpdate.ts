import { useContext } from "react"
import { AppContext } from "../context/AppContext"

export const useCartUpdate = () => {
    const {isCartUpdate,cartUpdate} = useContext(AppContext)
    return{
        cartUpdate,isCartUpdate
    }
}