import React from "react";
import classes from './Burger.module.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {

    const transfromIngredients = Object.keys(props.ingredients).map(ingredientKey => {
        return [...Array(props.ingredients[ingredientKey])].map((el, index) => {
            return <BurgerIngredient type={ingredientKey} key={ingredientKey + '_' + index} />;
        })
    });

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={'bread-top'} />
            {transfromIngredients}
            <BurgerIngredient type={'bread-bottom'} />
        </div>
    );
};


export default burger;