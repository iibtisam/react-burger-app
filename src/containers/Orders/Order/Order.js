import React from "react";
import classes from './Order.module.css';


const order = props => {
    console.log(props);
    const ingredients = [];
    for(let ingredient in props.ingredients){
        if (props.ingredients.hasOwnProperty(ingredient)) {
            // for (let ingredientVal = 0; ingredientVal < props.ingredients[ingredient]; ingredientVal++) {
            ingredients.push(<span
                style={{
                    display: "inline-block",
                    textTransform: "capitalize",
                    margin: '0 8px',
                    border: "1px solid #cccccc",
                    padding: '5px'
                }}
                key={ingredient}> {ingredient + ' (' + props.ingredients[ingredient] +')'}   </span>);
            // }
        }
    }

    return (
        <div className={classes.Order}>
            <p> Ingredients: {ingredients}</p>
            <p> Price: <strong> USD {props.price}</strong></p>
        </div>
    );
};

export default order;