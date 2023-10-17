import * as types from '../ActionTypes/ourProductsActionTypes';

const initialState = {
    OurProducts: [],
    SingleProduct: [],
    isLoading: false,
    isSuccess: false,
}

const OurProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_OUR_PRODUCTS_START:
        case types.GET_SINGLE_PRODUCT_START:
        case types.ADD_OUR_PRODUCT_START:
        case types.DELETE_OUR_PRODUCT_START:
            // case types.UPDATE_OUR_PRODUCTS_START:
            return {
                ...state,
                isSuccess: false,
                isLoading: true,
            };
        case types.LOAD_OUR_PRODUCTS_SUCCESS:
            return {
                ...state,
                OurProducts: action.payload,
                isLoading: false,
                isSuccess: false,
            }
        case types.GET_SINGLE_PRODUCT_SUCCESS:
            return {
                ...state,
                SingleProduct: action.payload,
                isLoading: false,
                isSuccess: false,
            }
        case types.ADD_OUR_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
            }
        case types.DELETE_OUR_PRODUCT_SUCCESS:
            // case types.UPDATE_OUR_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
            }
        case types.LOAD_OUR_PRODUCTS_ERROR:
        case types.GET_SINGLE_PRODUCT_ERROR:
        case types.ADD_OUR_PRODUCT_ERROR:
        case types.DELETE_OUR_PRODUCT_ERROR:
            // case types.UPDATE_OUR_PRODUCTS_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
                isSuccess: false,
            }
        default:
            return state;
    }
}

export default OurProductsReducer;