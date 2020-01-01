import React, {useState, useEffect, useCallback} from "react";
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from '../../store/actions/index';
import {useDispatch, useSelector} from 'react-redux';

import axios from '../../axios-orders';


const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);
    const dispatch = useDispatch();
    const ings = useSelector(state => {
        return state.burgerBuilder.ingredients;
    });
    const price = useSelector(state => {
        return state.burgerBuilder.totalPrice;
    });
    const error = useSelector(state => {
        return state.burgerBuilder.error;
    });
    const isAuthenticated = useSelector(state => {
        return !!state.auth.token;
    });
    const onIngredientAdded = (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(burgerBuilderActions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(burgerBuilderActions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path));


    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients])


    const updatePurchaseState = (ingredients) => {
        let purchasable = false;
        for (let key in ingredients) {
            if (ingredients.hasOwnProperty(key)) {
                if (ingredients[key] > 0) {
                    purchasable = true;
                    break;
                }
            }
        }
        return purchasable;
    };

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };
    const purchaseContinueHandler = () => {
        console.log('calling');
        onInitPurchase();
        props.history.push('/checkout');
    };

    const disabledInfo = {
        ...ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] === 0;
    }
    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
    console.log(ings);
    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings}/>
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    price={price}
                    purchasable={updatePurchaseState(ings)}
                    ordered={purchaseHandler}
                    isAuth={isAuthenticated}
                />
            </Aux>
        );
        orderSummary = (<OrderSummary
            ingredients={ings}
            purchaseCancaled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
            price={price}
        />);

    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}

// const mapStateToProps = state => {
//     return {
//         ings: state.burgerBuilder.ingredients,
//         price: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticated: !!state.auth.token
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
//         onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
//         onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
//         onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
//         onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
//     };
// };

export default withErrorHandler(BurgerBuilder, axios);