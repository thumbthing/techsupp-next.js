import httpInstance from '../httpInstance';

export const getProductListFromDB = async () => {
  try {
    const response = await httpInstance.get('/product');
    return response.data;
  } catch (error) {
    console.log(error);

    return Promise.reject({
      status: 500,
      message: 'Internal server error',
    });
  }
};

export const testApi = async () => {
  try {
    const response = await httpInstance.get('/test');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
