import * as types from "../ActionTypes/actionTypes";
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";

import {
    loadUsersSuccess, loadUsersError,
    adminLoginSuccess, adminLoginError,
    deleteUsersSuccess, deleteUsersError,
    getSingleUsersSuccess, getSingleUsersError,
    userRegisterSuccess, userRegisterError,
    countStartSuccess, countStartError,
    userUpdateSuccess, userUpdateError,    
} from "../Actions/actions";

import { 
        loadUsersApi, 
        adminLoginApi, 
        deleteUsersApi, 
        getSingleUserApi, 
        countApi, 
        userRegisterApi,
        updateUserApi,
         } from "../APIs/api";
import { Link } from "@mui/material";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
});
// ----------------------------------------------------------------
export function* onLoadUsersStartAsync() {
    try {
        const response = yield call(loadUsersApi);
        if (response.status === 200) {
            yield put(loadUsersSuccess(response));
        }
    } catch (error) {
        yield put(loadUsersError(error));
    }
}
// ----------------------------------------------------------------
export function* onCountStartAsync() {
    try {
        const response = yield call(countApi);
        if (response.status === 200) {
            yield put(countStartSuccess(response));
        }
    } catch (error) {
        yield put(countStartError(error));
    }
}
// ----------------------------------------------------------------
export function* onUserUpdateStartAsync({ payload }) {
    console.log('update user paylod~~~>',payload)
    try {
        const response = yield call(updateUserApi, payload);
        console.log('update user response~~~>',response)
        if (response?.status === 200) {
            yield put(userUpdateSuccess(response));
            Toast.fire({
                icon: "success",
                title: response?.data?.message,
            });
            // <Link to={`/register/`}></Link>
        } else {
            Toast.fire({
                icon: "error",
                title: response?.data?.detail,
            });
            return response;
        }
    } catch (error) {
        yield put(userUpdateError(error.response));
        if (error.response.data.detail) {
            Toast.fire({
                icon: "error",
                title: error.response.data.detail,
            });
        }
    }
}
// ----------------------------------------------------------------
export function* onuserRegiterStartAsync({payload}) {
    console.log('user create payload~~~~~~~~~~~~>',payload)
    try {
        const response = yield call(userRegisterApi, payload);
        console.log('user create response~~~~~~~~~~~~>',response);
        if (response?.status === 200) {
            yield put(userRegisterSuccess(response));
            Toast.fire({
                icon: "success",
                title: response?.data?.message,
            });
        }
    } catch (error) {
        yield put(userRegisterError(error.response));
        if (error?.response?.data?.errors?.email) {
            Toast.fire({
                icon: "error",
                title: error?.response?.data?.errors?.email,
            });
        }else if(error?.response?.data?.errors?.phone) {
            Toast.fire({
                icon: "error",
                title: error?.response?.data?.errors?.phone,
            });
        }}
    }


export function* onAdminLoginStartAsync({ payload }) {
    try {
        const response = yield call(adminLoginApi, payload);
        console.log('login response~~~>',response)
        if (response?.status == 200) {
            const Token = response?.data?.data?.token
            localStorage.setItem("ADMIN", Token);
            yield put(adminLoginSuccess(response));
            Toast.fire({
                icon: "success",
                title: response?.data?.message,
            });
            <Link to={`/admindashboard`}/>
        } else {
            Toast.fire({
                icon: "error",
                title: response?.data?.message,
            });
            return response;
        }
    } catch (error) {
        yield put(adminLoginError(error.response));
        Toast.fire({
            icon: "error",
            title: error.response?.data?.message,
        });
    }
}
// -----------------------------------------------------------------------------------------------

export function* onDeleteUsersStartAsync({ payload }) {
    try {
        const response = yield call(deleteUsersApi, payload);
        if (response.data.status === 200) {
            yield put(deleteUsersSuccess(response));
            Toast.fire({
                icon: "success",
                title: "Users Deleted SuccessFully",
            });
        } else {
            Toast.fire({
                icon: "error",
                title: response.data.message,
            });
        }
    } catch (error) {
        yield put(deleteUsersError(error.response));
    }
}
// ----------------------------------------------------------------
export function* onSigleUsersStartAsync({ payload }) {
    try {
        const response = yield call(getSingleUserApi, payload);
        if (response.status === 200) {
            yield put(getSingleUsersSuccess(response.data));
        }
    } catch (error) {
        yield put(getSingleUsersError(error.response));
    }
}

// ----------------------------------------------------------------
export function* onUserRegiterStart() {
    yield takeLatest(types.USER_REGISTER_START, onuserRegiterStartAsync);
}
export function* onAdminLogin() {
    yield takeLatest(types.ADMIN_LOGIN_START, onAdminLoginStartAsync);
}
export function* onUserUpdate() {
    yield takeLatest(types.UPDATE_USERS_START, onUserUpdateStartAsync);
}

export function* onLoadUsers() {
    yield takeLatest(types.LOAD_USERS_START, onLoadUsersStartAsync);
}
export function* onCount() {
    yield takeLatest(types.COUNT_START, onCountStartAsync);
}

export function* onGetSingleUsers() {
    yield takeLatest(types.GET_SINGLE_USERS_START, onSigleUsersStartAsync);
}

export function* onDeleteUsers() {
    yield takeLatest(types.DELETE_USERS_START, onDeleteUsersStartAsync);
}

const userSagas = [
    fork(onLoadUsers),
    fork(onAdminLogin),
    fork(onUserUpdate),
    fork(onGetSingleUsers),
    fork(onDeleteUsers),
    fork(onUserRegiterStart),
    fork(onCount),
];

export default function* userSaga() {
    yield all([...userSagas]);
}