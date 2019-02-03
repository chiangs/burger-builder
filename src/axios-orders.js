import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://reactburgerbuilder-2019.firebaseio.com/'
});

export default instance;
