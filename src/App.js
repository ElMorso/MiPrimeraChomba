import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./config/firebase";
import {Cart} from "./components/Cart/Cart";
import { CartProvider } from "./components/CartContext/CartContext";
import { useEffect, useState } from "react";
import Checkout from "./components/Checkout/Checkout";
import "./App.css"


function App() {
  const [itemList, settItemList] = useState([]);
  const itemCollectionRef = collection(db, "products");
  console.log(itemCollectionRef)
  
  useEffect(()=>{
    const getItemList = async () =>{
    const  data = await getDocs(itemCollectionRef)
    const filteredData = data.docs.map((doc)=>({
      ...doc.data(),
      id:doc.id
    }));
    settItemList(filteredData)
    }
    getItemList();
  },[itemCollectionRef])
  return (
    <div>
      {itemList.map((item)=>(
        <div key={item.id}>
          <h2>{item.nombre}</h2>
          <h3>{item.precio}</h3>
          <h4>{item.cantidad}</h4>
        </div>
      ))}
      <BrowserRouter>
        <CartProvider>
        <NavBar/>
        <Routes>
          <Route path="/" element={<ItemListContainer />}/>
          <Route path="category/:categoryId" element={<ItemListContainer />}/>
          <Route path="item/:itemId" element={<ItemDetailContainer/>}/>
          <Route path="cart" element={<Cart/>}/>
          <Route path="checkout" className=" Checkout" element = {<Checkout/>}/>
          <Route path="*" element={<h2>404 not found</h2>}/>
        </Routes>
        </CartProvider>
      </BrowserRouter>
    </div>

  )
}
export default App;
