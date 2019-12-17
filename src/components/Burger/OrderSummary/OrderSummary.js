import React from "react";
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

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
            <p><strong>
                Total Price: ${props.price.toFixed(2)}
            </strong></p>
            <p> Continue to Checkout?</p>
            <Button clicked={props.purchaseCancaled} btnType="Danger"> CANCEL </Button>
            <Button clicked={props.purchaseContinued} btnType="Success"> CONTINUE </Button>
        </Aux>
    )
};

export default orderSummary;