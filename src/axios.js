import axios from 'axios';

const instance = axios.create({
    baseURL:'https://interested-api.herokuapp.com'
});

export default instance;