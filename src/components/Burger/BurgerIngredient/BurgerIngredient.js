import React from "react";
import classes from './BurgerIngredient.css';


const burgerIngredient = props => {

    let ingredient = null;

    switch (props.type) {
        case('bread-bottom'):
            ingredient = <div className={classes.BreadBottom}>&nbsp;</div>;
            break;
        case('bread-top'):
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}>&nbsp;</div>
                    <div className={classes.Seeds2}>&nbsp;</div>
                </div>);
            break;
        case('meat'):
            ingredient = <div className={classes.Meat}>&nbsp;</div>;
            break;
        case('cheese'):
            ingredient = <div className={classes.Cheese}>&nbsp;</div>;
            break;
        case('salad'):
            ingredient = <div className={classes.Salad}>&nbsp;</div>;
            break;
        case('bacon'):
            ingredient = <div className={classes.Bacon}>&nbsp;</div>;
            break;
        default:
            ingredient = null;
    }

    return ingredient;

};

export default burgerIngredient;