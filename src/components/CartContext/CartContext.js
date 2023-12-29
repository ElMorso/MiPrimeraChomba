import { createContext, useState } from "react";

export const CartContext = createContext ({
    cart: []
})
export const CartProvider = ({children})=>{

    const [cart, setCart]=useState ([])
    const addItem = (item, quantity) => {
        if (!isInCart(item.id)){
            setCart (prev =>[...prev, {... item , quantity}])
        } 
        else {console.error ('El producto ya fue agregado')
        }
    }
            const removeItem = (itemId) =>{
                const cartUpdated =cart.filter(prod => prod.id !== itemId)
                setCart (cartUpdated)
            }
            const clearCart = () =>{
                setCart([])
                return
            }
            const totalPrice = ()=>{
                return cart.reduce((prev,act)=>prev + act.quantity * act.price, 0)
            }
            const totalQuantity = cart.reduce((acumulador, itemActual) => acumulador + itemActual.quantity,0);
        
            const isInCart = (itemId) =>{
                return cart.some (prod => prod.id === itemId)
            }
            return(
                <CartContext.Provider value={{ addItem, removeItem, clearCart, totalQuantity, totalPrice, cart, isInCart}}>
                    {children}
                </CartContext.Provider>
            )
}