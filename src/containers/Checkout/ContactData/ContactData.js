import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {withRouter} from 'react-router-dom';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props);
        this.setState({
            loading: true
        });

        const data = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Ibtisam ul Haq',
                address: {
                    street: 2,
                    house_no: 111,
                    block: 'B',
                    society: 'NFC'
                },
                email: 'iibtisam@gmail.com',
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', data).then(response => {
            this.setState({
                // purchasing: false,
                loading: false
            });
            this.props.history.push('/');
        }).catch(error => {
            this.setState({
                // purchasing: false,
                loading: false
            });
        })
    };

    render() {
        let form = (<form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                    <input className={classes.Input} type="text" name="email" placeholder="Your Email"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                    <Button btnType="Success" clicked={this.orderHandler}> Order </Button>
                </form>);
        if(this.state.loading){
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4> Enter your contact data</h4>
                {form}
            </div>
        );
    }
}


export default withRouter(ContactData);