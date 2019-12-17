import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://react-burger-app-ibtisam.firebaseio.com/'
});


export default instance;