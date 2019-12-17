import React, {Component} from "react";
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        // constructor() {
        //     super();
        //     axios.interceptors.request.use(req => {
        //         this.setState({error: null})
        //         return req;
        //     });
        //     axios.interceptors.response.use(res => res, error => {
        //         console.log(error);
        //         window.asdasd = error;
        //         this.setState({error: error.message});
        //     })
        //
        // }

        // componentDidMount() // this will call after render ... not good for starting get request. Good for post request only
        componentWillMount() { // this is solution for the above statement. we can use constructor as well but no idea how to unmount that.
            this.requestInterceptors = axios.interceptors.request.use(req => {
                this.setState({error:null})
                return req;
            });
            this.responseInterceptors =  axios.interceptors.response.use(res => res, error => {
                console.log(error);
                window.asdasd =error;
                this.setState({error: error.message});
            })
        }


        componentWillUnmount() {
            axios.interceptors.response.eject(this.responseInterceptors);
            axios.interceptors.request.eject(this.responseInterceptors);
        }

        errorConfirmedError = () => {
            this.setState({error: null})
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedError}
                    >
                        {this.state.error ? this.state.error : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    };
}

export default withErrorHandler;