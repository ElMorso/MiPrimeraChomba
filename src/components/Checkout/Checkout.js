import { useContext, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import { db } from "../../config/firebase";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { Timestamp, collection, writeBatch, getDocs, query, where, documentId, addDoc } from "firebase/firestore";

const Checkout = () => {
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState('');
    const {cart, totalQuantity, clearCart} = useContext(CartContext);

    const createOrder = async ({ name, phone, email }) => {
        setLoading(true);
        try {
            const objOrder = {
                buyer: {
                    name, phone, email,
                },
                items: cart,
                total: totalQuantity,
                date: Timestamp.fromDate(new Date()),
            };

            const batch = writeBatch(db);
            const outOfStock = [];
            const ids = cart.map(prod => prod.id)
            const productsRef = collection(db, 'products')
            const productsAddedFromfirestore = await getDocs(query(productsRef, where(documentId(), 'in', ids)));

            const { docs } = productsAddedFromfirestore;
            docs.forEach(doc => {
                const dataDoc = doc.data();
                const stockDb = dataDoc.stock;
                const productAddedToCart = cart.find(prod => prod.id === doc.id);
                const prodQuantity = productAddedToCart?.quantity;

                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity });
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc });
                }
            });

            if (outOfStock.length === 0){
                await batch.commit();
                const orderRef = collection(db,'orders');
                
                const orderAdded = await addDoc(orderRef, objOrder);
                setOrderId(orderAdded.id);
                clearCart();
            } else {
                console.error('Hay productos que están fuera de stock');
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h1>Se está generando su orden</h1>;
    }

    if (orderId) {
        return <h1>El ID de su orden es:{orderId}</h1>;
    }

    return (
        <div>
            <h1 className="productosIntro">Complete sus datos</h1>
            <CheckoutForm onConfirm={createOrder}/>
        </div>
    );
}

export default Checkout;