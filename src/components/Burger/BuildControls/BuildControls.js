import React from "react";
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';


const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'},
]

const buildControls = props => (
    <div className={classes.BuildControls}>
        <p> Current Price {Math.round(props.price * 100)/100 } </p>
        {controls.map(ctrl => {
            return <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />;
        })}
    </div>
);

export default buildControls;