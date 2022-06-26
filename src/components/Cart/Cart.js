import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";


const Cart = (props) => {
 const [isCheckout, setIsChechkout] = useState(false)
 const [isSubmitting, setIsSubmitting] = useState(false)
 const [submitted, setSubmitted] = useState(false)
 const [error, setError] = useState(null)
 const cartCtx = useContext(CartContext);
 const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
 const orderAvailable = cartCtx.totalAmount!==0;

const cartItemSubractHandler = (id)=>{
cartCtx.removeItem(id)
}

const cartItemAddHandler = (item) => {
cartCtx.addItem({...item, amount:1});
};



const orderHandler= ()=>{
    setIsChechkout(true);
  }
  
  
  const submitOrderHandler= async(userEnteredData)=>{
    try{setIsSubmitting(true)
      const response = await fetch("https://react-hooks-6ce10-default-rtdb.firebaseio.com/orders.json", {
        method: 'POST',
        body: JSON.stringify({
          user:userEnteredData,
          orderedItems: cartCtx.items
        })
      });
      if(!response.ok){
        throw new Error(`Something Went Wrong ${response.status}`)};
        
      setSubmitted(true);
      cartCtx.submitItems();
      }
      catch (Error){
        isSubmitting(false)
      }
      
    }

    const modalActions = (
      <div className={classes.actions}>
        <button onClick={props.cartHandler} className={classes["button--alt"]}>
          Close
        </button>
        {orderAvailable && <button onClick={orderHandler} className={classes.button}>Order</button>}
      </div>
  )
  
  const cartItem = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemSubractHandler.bind(null, item.id)}
          ></CartItem>
      ))}
    </ul>
  );
  return (
    <Modal onClick={props.cartHandler}>
      {isSubmitting ? (submitted?<p>Order Placed Successfully</p>:
        <p>Your Order Is being Placed...</p>
      ) : (
        <div>
          {" "}
          {cartItem}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          {isCheckout && (
            <Checkout
              onConfirm={submitOrderHandler}
              onCancel={props.cartHandler}
            />
          )}
          {!isCheckout && modalActions}{" "}
        </div>
      )}
    </Modal>
  );
};

export default Cart;
