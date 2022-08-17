import { TodoState } from "../interfaces/interfaces";

type TodoAction = | {type:"auth",payload:boolean} | {type:"cartUpdate",payload:number} | {type:"products",payload:any[]}

export const appReducer = (state:TodoState,action:TodoAction) => {
    switch(action.type){
        case 'auth':
            return {
                ...state,auth:action.payload
            }
        case 'cartUpdate':
            return {
                ...state,cartUpdate:action.payload
            }
        case 'products':
            return {
                    ...state,productsMarket:action.payload
                }    
        default:
            return state;
    }
}