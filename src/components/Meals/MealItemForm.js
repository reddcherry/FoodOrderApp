import { useRef } from 'react'
import Input from '../UI/Input'
import classes from './MealItemForm.module.css'

const MealItemForm = props=>{
 const foodAmountRef = useRef();
const submitHandler =(event)=>{
  event.preventDefault();
  const enteredAmount = +foodAmountRef.current.value;
  props.onAddToCart(enteredAmount)
}

 return <form onSubmit={submitHandler} className={classes.form}>
  <Input label ='Amount'  foodAmountRef= {foodAmountRef} input ={{id:props.id, type: 'number', min:'1', max:'5', step:'1', defaultValue:1}}/>
  <button> + Add</button>
 </form>
}

export default MealItemForm