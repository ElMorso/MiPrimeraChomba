import { CartContext } from "../CartContext/CartContext";
import React from "react"
import { useContext } from "react"


const CartItem = ({ name, price, id, img, quantity }) => {

    const { removeItem, } = useContext(CartContext)

    return (
        <div className="CartItem">

            <h2 className="productoFin"> Producto: {name}</h2>
            <img src={img} alt={name} />
            <p>Cantidad: {quantity}</p>
            <p>Subtotal: ${price * quantity}</p>
            <button onClick={() => removeItem(id)}>Eliminar</button>

        </div>
    )
}
/*
const CartItem = ({products}) => {

    const { removeProducts } = useContext(CartContext);

console.log(products)

    return (
        <div>
            <picture>
                <img src={products.img} alt={products.name} />
            </picture>
            <div>
                <h2>{products.name}</h2>
                <p>Cantidad:{products.quantity}</p>
                <p>Subtotal:{products.quantity * products.price}</p>
                <button onClick={()=> removeProducts(products.id)}>Eliminar</button>
            </div>
        </div>
    )
}
*/
export default CartItem