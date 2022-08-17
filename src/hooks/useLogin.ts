import { useContext } from "react"
import { AppContext } from "../context/AppContext"

export const useLogin = () => {
    const {auth,isAuth} = useContext(AppContext)
    return{
        auth,isAuth
    }
}