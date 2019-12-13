import React from "react";
import Aux from '../../../hoc/Aux'


const orderSummary = props => {
    const ingredientSummary = [];
    for (let k in props.ingredients) {
        if (props.ingredients.hasOwnProperty(k)) {
            ingredientSummary.push(
                <li key={k+"_"+props.ingredients[k]}>
                    <span style={{textTransform: 'capitalize'}}>{k}:</span> {props.ingredients[k]}
                </li>
            )
        }
    }

    return (
        <Aux>
            <h3>
                Your Order
            </h3>
            <p>
                A delicious burger with the following ingredients:
            </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p> Continue to Checkout?</p>
        </Aux>
    )
};

export default orderSummary;