import React, {Component} from "react";
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from '../../store/actions';
import {connect} from 'react-redux';


import axios from '../../axios-orders';


class BurgerBuilder extends Component {

    state = {
        purchasable: false,
        purchasing: false,
        loading: false
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
        // this.setState({
        //     purchasable: purchasable
        // })
        //
        return purchasable;
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };
    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    /*purchaseContinueHandler = () => {
        const queryParams = [];
        for (let index in this.state.ingredients) {
            queryParams.push(encodeURIComponent(index) + '=' + encodeURIComponent(this.state.ingredients[index]))
        }

        queryParams.push('price=' + this.props.price.toFixed(2));
        const queryString = '?' + queryParams.join('&');
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
        //     price: this.props.price,
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
    };*/

    componentDidMount() {
        // axios.get('https://react-burger-app-ibtisam.firebaseio.com/ingredients.json').then(response => {
        //     console.log(response);
        //     this.setState({
        //         ingredients: response.data
        //     })
        // }).catch(error => {
        //
        // });
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        }
        let orderSummary = null;
        let burger = <Spinner/>;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = (<OrderSummary
                ingredients={this.props.ings}
                purchaseCancaled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }),
    onIngredientRemoved: (ingName) => dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));