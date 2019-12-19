import React, {Component} from "react";
import Order from './Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

    state = {
        orders: [],
        loading: false
    }

    componentDidMount() {
        this.setState({
            loading: true
        });
        axios.get('/orders.json').then((response) => {
            console.log(response);
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                });
            }
            this.setState({
                loading: false,
                orders: fetchedOrders
            });
        }).catch((error) => {
            console.log(error);
            this.setState({
                loading: false
            });
        })
    }

    render() {
        let order = (
            this.state.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            ))
        );
        if (this.state.loading) {
            order = <Spinner/>
        }
        return (
            <div>
                {order}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);