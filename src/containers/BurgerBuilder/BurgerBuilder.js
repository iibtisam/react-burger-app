import React, {Component} from "react";
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INTEGRENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0
    };

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] + 1;;
        const updatedPrice = this.state.totalPrice + INTEGRENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        })
    };

    removeIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] - 1 < 0 ? 0 : this.state.ingredients[type] - 1;
        const updatedPrice = this.state.totalPrice - INTEGRENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        })
    };



    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] === 0;
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                />
            </Aux>
        );
    }
}


export default BurgerBuilder;