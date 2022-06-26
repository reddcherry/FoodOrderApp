import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (numberOfCartItems===0) {
      return;
    }
    setBtnIsHighlighted(true);
    const bumper = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);
    // return () => clearTimeout(bumper);
  }, [numberOfCartItems]);

  return (
    <button onClick={props.cartHandler} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}> {numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
