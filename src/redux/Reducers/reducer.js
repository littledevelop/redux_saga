import * as types from "../ActionTypes/actionTypes";

const initialState = {
    userRegisterData:[],
    loginData: [],
    users: [],
    updateUser: [],
    // count: [],
    singleUser: [],
    isLoading: false,
    isSuccess: false,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_REGISTER_START:
        case types.COUNT_START:
        case types.LOAD_USERS_START:
        case types.UPDATE_USERS_START:
            return {
                isSuccess: false,
                isLoading: true,
            };
        case types.ADMIN_LOGIN_START:
        case types.DELETE_USERS_START:
        case types.GET_SINGLE_USERS_START:
        case types.LOAD_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                isLoading: false,
                isSuccess: false,
            };
        case types.COUNT_SUCCESS:
                return {
                    ...state,
                    count:action.payload,
                    isSuccess: false,
                    isLoading: false,
                };
        case types.USER_REGISTER_SUCCESS:
            return {
                ...state,
                users: action.payload,
                isSuccess: true,
                isLoading:false
            };
        case types.UPDATE_USERS_SUCCESS:
            return {
                ...state,
                updateUser: action.payload,
                isSuccess: true,
                isLoading:false
            };
        case types.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                // loginData: action.payload,
                isSuccess: true,
                isLoading:false,
            };
        case types.GET_SINGLE_USERS_SUCCESS:
            return {
                ...state,
                singleUser: action.payload,
            };
        case types.DELETE_USERS_SUCCESS:
            return {
                // ...state,
                // users: action.payload,
                isLoading: false,
                isSuccess: true,
            };
        case types.USER_REGISTER_ERROR:
        case types.ADMIN_LOGIN_ERROR:
        case types.UPDATE_USERS_ERROR:
        case types.LOAD_USERS_ERROR:
        case types.COUNT_ERROR:
        case types.DELETE_USERS_ERROR:
        case types.GET_SINGLE_USERS_ERROR:
        default:
            return state;
    }
};

export default usersReducer;
