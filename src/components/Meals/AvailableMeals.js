import Card from "../UI/Card";
import classes from './AvailableMeals.module.css'
import MealItem from "./MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = props=>{
  const [meals, setMeals] =useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('')
  useEffect(()=>{
     const fetchMeals= async() => {
try {       setIsLoading(true)
      const response = await fetch(
        "https://react-hooks-6ce10-default-rtdb.firebaseio.com/Meals.json"
      );
      
      if (!response.ok) {throw new Error(`Something went wrong : ${response.status}`)}
      const mealData = await response.json();
      const loadedMeals = [];
      for (const key in mealData){
        loadedMeals.push({
          id: key,
          name: mealData[key].name,
          description: mealData[key].description,
          price: mealData[key].price,
        });
      }

      setIsLoading(false);
      setError("");
      setMeals(loadedMeals)} catch(Error){
        setError(Error)
        setIsLoading(false);
        console.log(Error.message);
      }
    };
    fetchMeals();
    
  }, []);
if(isLoading){
 return <p className={classes.load}>loading...</p> 
}
if(error){
 return  <p className={classes.load}>{error.message}...</p> 
}
 const mealList = meals.map(meal=> <MealItem key = {meal.id} mealitem= {meal}/>)
return (
  <Card class={classes.meals}>
    <ul>{mealList}</ul>
  </Card>
);
}
export default AvailableMeals