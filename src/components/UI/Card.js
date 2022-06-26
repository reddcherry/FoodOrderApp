import classes from './Card.module.css'

const Card = props=>{
 const CardClasses = `${classes.card} ${props.class} `
return <div className={CardClasses}>
{props.children}
</div>
}
export default Card