import Axios from 'axios';
import { variables } from '../constants/variables';

const application = Axios.create({
    baseURL: variables.baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
    }
});

export { application };
