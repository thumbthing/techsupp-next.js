import httpInstance from '../httpInstance';

export const getProductListFromDB = async () => {
  try {
    const response = await httpInstance.get('/product');
    return response.data;
  } catch (error) {
    console.log(error);

    return Promise.reject({
      status: 500,
      message: 'Internal server error PL',
    });
  }
};

export const getSingleProductFromDB = async (productId: string) => {
  try {
    const response = await httpInstance.get(`/product/${productId}`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error(error);

    return Promise.reject({
      status: 500,
      message: 'Internal server error PS',
    });
  }
};
