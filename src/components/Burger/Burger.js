import React from "react";
import classes from './Burger.module.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {

    let transformIngredients = [];
    for(let ingredient in props.ingredients){
        if (props.ingredients.hasOwnProperty(ingredient)) {
            for (let ingredientVal = 0; ingredientVal < props.ingredients[ingredient]; ingredientVal++) {
                transformIngredients.push(<BurgerIngredient type={ingredient} key={ingredient + ingredientVal}/>);
            }
        }
    }

    if(transformIngredients.length === 0){
        transformIngredients = <p> Please start adding ingredients </p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={'bread-top'} />
            {transformIngredients}
            <BurgerIngredient type={'bread-bottom'} />
        </div>
    );
};


export default burger;