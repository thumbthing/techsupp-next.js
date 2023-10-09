import httpInstance from '../httpInstance';

export const getProductListFromDB = async () => {
  try {
    const response = await httpInstance.get('/product');
    return response.data;
  } catch (error) {
    return Promise.reject({
      status: 500,
      message: 'Internal server error',
    });
  }
};
