import cart from './assets/Carr.svg'
import { useContext } from 'react'
import { CartContext } from "../CartContext/CartContext";
import { Link } from 'react-router-dom'

const CartWidget = () => {
    const { totalQuantity } = useContext(CartContext)

        return (
            <Link to='/cart' className='CartWidget' style={{ display: totalQuantity > 0}}>
                <img className='CartImg' src={cart} alt='cart-widget'/>
                {totalQuantity}
            </Link>
    )
}

export default CartWidget