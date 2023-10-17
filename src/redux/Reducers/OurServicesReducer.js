import * as types from '../ActionTypes/ourServicesActionTypes';

const initialState = {
    OurServices: [],
    SingleService: [],
    isLoading: false,
    isSuccess: false,
}

const OurServicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_OUR_SERVICES_START:
        case types.ADD_OUR_SERVICE_START:
        case types.UPDATE_OUR_SERVICE_START:
        case types.DELETE_OUR_SERVICE_START:
        case types.GET_SINGLE_SERVICE_START:
            return {
                ...state,
                isSuccess: false,
                isLoading: true,
            };
        case types.LOAD_OUR_SERVICES_SUCCESS:
            return {
                ...state,
                OurServices: action.payload,
                isLoading: false,
                isSuccess: false,
            }
        case types.GET_SINGLE_SERVICE_SUCCESS:
            return {
                ...state,
                SingleService: action.payload,
                isLoading: false,
                isSuccess: false,
            }
        case types.ADD_OUR_SERVICE_SUCCESS:
        case types.UPDATE_OUR_SERVICE_SUCCESS:
        case types.DELETE_OUR_SERVICE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
            }
        case types.LOAD_OUR_SERVICES_ERROR:
        case types.ADD_OUR_SERVICE_ERROR:
        case types.UPDATE_OUR_SERVICE_ERROR:
        case types.DELETE_OUR_SERVICE_ERROR:
        case types.GET_SINGLE_SERVICE_ERROR:
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

export default OurServicesReducer;