import * as types from "../ActionTypes/actionTypes";

export const userUpdateStart = (user) => ({
    type: types.UPDATE_USERS_START,
    payload: user,
});

export const userUpdateSuccess = (register) => ({
    type: types.UPDATE_USERS_SUCCESS,
    payload: register,
});

export const userUpdateError = (error) => ({
    type: types.UPDATE_USERS_ERROR,
    payload: error,
});
// ---------------------------------------------------
export const userRegisterStart = (user) => ({
    type: types.USER_REGISTER_START,
    payload: user,
});

export const userRegisterSuccess = (register) => ({
    type: types.USER_REGISTER_SUCCESS,
    payload: register,
});

export const userRegisterError = (error) => ({
    type: types.USER_REGISTER_ERROR,
    payload: error,
});
// ---------------------------------------------------------

export const adminLoginStart = (user) => ({
    type: types.ADMIN_LOGIN_START,
    payload: user,
});

export const adminLoginSuccess = (login) => ({
    type: types.ADMIN_LOGIN_SUCCESS,
    payload: login,
});

export const adminLoginError = (error) => ({
    type: types.ADMIN_LOGIN_ERROR,
    payload: error,
});
// ----------------------------------------------------------------------
export const loadUsersStart = () => ({
    type: types.LOAD_USERS_START, 
});

export const loadUsersSuccess = (users) => ({
    type: types.LOAD_USERS_SUCCESS,
    payload: users,
});

export const loadUsersError = (error) => ({
    type: types.LOAD_USERS_ERROR,
    payload: error,
});
// ----------------------------------------------------------------------
export const getSingleUsersStart = (singleUsers) => ({
    type: types.GET_SINGLE_USERS_START,
    payload: singleUsers,
});

export const getSingleUsersSuccess = (singleUsers) => ({
    type: types.GET_SINGLE_USERS_SUCCESS,
    payload: singleUsers,
});

export const getSingleUsersError = (error) => ({
    type: types.GET_SINGLE_USERS_ERROR,
    payload: error,
});

export const deleteUsersStart = (userId) => ({
    type: types.DELETE_USERS_START,
    payload: userId,
});

export const deleteUsersSuccess = (userId) => ({
    type: types.DELETE_USERS_SUCCESS,
    payload: userId,
});

export const deleteUsersError = (error) => ({
    type: types.DELETE_USERS_ERROR,
    payload: error,
});


export const countStart = () => ({
    type: types.COUNT_START, 
});

export const countStartSuccess = (count) => ({
    type: types.COUNT_SUCCESS,
    payload: count,
});

export const countStartError = (error) => ({
    type: types.COUNT_ERROR,
    payload: error,
});