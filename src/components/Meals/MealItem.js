import { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../store/cart-context";

const MealItem = (props) => {
const cartCtx = useContext(CartContext);
  const price = `$${props.mealitem.price.toFixed(2)}`;
  const addToCartHandler = amount =>{
    cartCtx.addItem({
      id: props.mealitem.id,
      name: props.mealitem.name,
      amount: amount,
      price: props.mealitem.price,
    });
  }
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.mealitem.name}</h3>
        <div className={classes.description}>{props.mealitem.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
       <MealItemForm id = {props.mealitem.id} onAddToCart = {addToCartHandler}/>
      </div>
    </li>
  );
};

export default MealItem;
