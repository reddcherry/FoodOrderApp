import React from 'react'
import classes from './Header.module.css'
import mealsImage from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton'
const Header = props=>{
return (
  <React.Fragment>
    <header className={classes.header}>
      <h1>React Meals</h1>
      <HeaderCartButton cartHandler = {props.cartHandler}/>
    </header>
    <div className={classes['main-image']}>
      <img src={mealsImage} alt ="Table full of Delicious Meals"/>
    </div>
  </React.Fragment>
);
}

export default Header;