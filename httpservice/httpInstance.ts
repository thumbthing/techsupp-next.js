import axios from 'axios';

const REQUEST_URL = process.env.NEXT_PUBLIC_PRODUCT_URI;

const baseHeader = {
  baseURL: REQUEST_URL,
};

const httpInstance = axios.create(baseHeader);

export default httpInstance;
