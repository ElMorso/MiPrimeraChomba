import { useContext } from "react";
import { CartContext } from "../CartContext/CartContext";
import CartItem from "../CartItem/CartItem";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
export const Cart =()=>{
    const {cart,  totalQuantity, totalPrice} = useContext(CartContext)
    const [total, setTotal] = useState (0);
    useEffect(() => {
        setTotal(totalPrice());  
    },[totalPrice]);
    if (totalQuantity === 0){
        return(
            <div>
                <h1>
                    No hay Productos en el carrito
                </h1>

                <Link to='/' className="option">Productos</Link>
            </div>
        )
    }
    return (
        <div>
            {
                cart.map(p=> <CartItem key={p.id} {...p}/>) }
                <h3 className="totalProd">Total: ${total}</h3>
                <Link className="totalProd" to='/checkout'> siguiente</Link>
      </div>
    )
}