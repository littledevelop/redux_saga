import * as types from '../ActionTypes/ourProductsActionTypes';
// ------------------------------------------------------------------
export const loadOurProductsStart = () => ({
    type: types.LOAD_OUR_PRODUCTS_START,
});

export const loadOurProductsSuccess = (products) => ({
    type: types.LOAD_OUR_PRODUCTS_SUCCESS,
    payload: products,
});

export const loadOurProductsError = (error) => ({
    type: types.LOAD_OUR_PRODUCTS_ERROR,
    payload: error,
});
// ------------------------------------------------------------------
export const getSingleProductStart = (SingleProduct) => ({
    type: types.GET_SINGLE_PRODUCT_START,
    payload: SingleProduct,
});

export const getSingleProductSuccess = (SingleProduct) => ({
    type: types.GET_SINGLE_PRODUCT_SUCCESS,
    payload: SingleProduct,
});

export const getSingleProductError = (error) => ({
    type: types.GET_SINGLE_PRODUCT_ERROR,
    payload: error,
})
// // ------------------------------------------------------------------
export const addOurProductStart = (newProduct) => ({
    type: types.ADD_OUR_PRODUCT_START,
    payload: newProduct,
});

export const addOurProductSuccess = (newProduct) => ({
    type: types.ADD_OUR_PRODUCT_SUCCESS,
    payload: newProduct,
});

export const addOurProductError = (error) => ({
    type: types.ADD_OUR_PRODUCT_ERROR,
    payload: error,
});
// // ------------------------------------------------------------------
export const deleteOurProductStart = (deleteOurProduct) => ({
    type: types.DELETE_OUR_PRODUCT_START,
    payload: deleteOurProduct,
});

export const deleteOurProductSuccess = (deleteOurProduct) => ({
    type: types.DELETE_OUR_PRODUCT_SUCCESS,
    payload: deleteOurProduct,
});

export const deleteOurProductError = (error) => ({
    type: types.DELETE_OUR_PRODUCT_ERROR,
    payload: error,
});
// // ------------------------------------------------------------------

// export const updateOurServiceStart = (updateOurService) => ({
//     type: types.UPDATE_OUR_SERVICE_START,
//     payload: updateOurService,
// });

// export const updateOurServiceSuccess = (updateOurService) => ({
//     type: types.UPDATE_OUR_SERVICE_SUCCESS,
//     payload: updateOurService,
// });

// export const updateOurServiceError = (error) => ({
//     type: types.UPDATE_OUR_SERVICE_ERROR,
//     payload: error,
// });


