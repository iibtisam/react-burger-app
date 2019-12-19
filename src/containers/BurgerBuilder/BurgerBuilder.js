import React, {Component} from "react";
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from '../../axios-orders';


const INTEGRENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    };

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] + 1;
        ;
        const updatedPrice = this.state.totalPrice + INTEGRENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
        this.updatePurchaseState(updatedIngredients);
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
        });
        this.updatePurchaseState(updatedIngredients);
    };

    updatePurchaseState = (ingredients) => {
        let purchasable = false;
        for (let key in ingredients) {
            if (ingredients.hasOwnProperty(key)) {
                if (ingredients[key] > 0) {
                    purchasable = true;
                    break;
                }
            }
        }
        this.setState({
            purchasable: purchasable
        })
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        const queryParams = [];
        for(let index in this.state.ingredients){
            queryParams.push(encodeURIComponent(index) + '=' + encodeURIComponent(this.state.ingredients[index]))
        }

        queryParams.push('price='+this.state.totalPrice.toFixed(2));
        const queryString = '?'+ queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: queryString

        });
        // this.setState({
        //     loading: true
        // });
        //
        // const data = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Ibtisam ul Haq',
        //         address: {
        //             street: 2,
        //             house_no: 111,
        //             block: 'B',
        //             society: 'NFC'
        //         },
        //         email: 'iibtisam@gmail.com',
        //     },
        //     deliveryMethod: 'fastest'
        // };
        //
        // axios.post('/orders.json', data).then(response => {
        //     this.setState({
        //         purchasing: false,
        //         loading: false
        //     });
        // }).catch(error => {
            this.setState({
                purchasing: false,
                loading: false
            });
        // })
    };

    componentDidMount() {
        axios.get('https://react-burger-app-ibtisam.firebaseio.com/ingredients.json').then(response => {
            console.log(response);
            this.setState({
                ingredients: response.data
            })
        }).catch(error => {

        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        }
        let orderSummary = null;
        let burger = <Spinner/>;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = (<OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancaled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice}
            />);
            if (this.state.loading) {
                orderSummary = <Spinner/>;
            }

        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}


export default withErrorHandler(BurgerBuilder, axios);