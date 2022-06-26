import {  useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartCalled, setCartCalled] = useState(false);
  const displayCartHandler = () => {
    cartCalled ? setCartCalled(false) : setCartCalled(true);
  };

  return (
    <CartProvider >
      {cartCalled ? <Cart cartHandler={displayCartHandler} /> : ""}
      <Header cartHandler={displayCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
} 

export default App;
