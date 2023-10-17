import * as types from '../ActionTypes/ourProductsActionTypes'
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";

import {
        loadOurProductsSuccess, loadOurProductsError,
        getSingleProductSuccess, getSingleProductError,
        addOurProductSuccess, addOurProductError,
        deleteOurProductSuccess, deleteOurProductError
} from '../Actions/ourProductsActions';
import { 
        loadOurProductssApi,
        getSingleProductApi,
        addOurProductApi,
        deleteProductApi } from '../APIs/ourProductsApi';

import { Link } from "@mui/material";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
});
// ----------------------------------------------------------------
export function* onLoadOurProductssStartAsync() {
    try {
        const response = yield call(loadOurProductssApi);
        if (response.status === 200) {
            yield put(loadOurProductsSuccess(response));
        }
    } catch (error) {
        yield put(loadOurProductsError(error));
    }
}
// ----------------------------------------------------------------
export function* onGetSingleProductStartAsync({ payload }) {
    try {
        const response = yield call(getSingleProductApi, payload)
        if (response.status === 200) {
            yield put(getSingleProductSuccess(response.data));
        }
    } catch (error) {
        yield put(getSingleProductError(error.response));
    }
}
// ----------------------------------------------------------------
export function* onaddOurProductStartAsync({payload}) {
    console.log('add product payload!~~~~~~~>',payload)
    try {
        const response = yield call(addOurProductApi, payload);
        console.log('add product!~~~~~~~>',response)
        if (response?.status === 200) {
            yield put(addOurProductSuccess(response));
            Toast.fire({
                icon: "success",
                title: response?.data?.message,
            });
        }
    } catch (error) {
        yield put(addOurProductError(error.response));
        Toast.fire({
            icon: "error",
            title: error?.message,
        });
    }
}
// ----------------------------------------------------------------
export function* onDeleteOurProductStartAsync({ payload }) {
    try {
        console.log('delete product! payload~~~~~~~>',payload)
        const response = yield call(deleteProductApi, payload)
        console.log('delete product!~~~~~~~>',response)
        if (response.status === 200) {
            yield put(deleteOurProductSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } else {
            Toast.fire({
                icon: "error",
                title: response?.data?.message,
            });
        }
    } catch (error) {
        yield put(deleteOurProductError(error.response));
        Toast.fire({
            icon: "error",
            title: error?.response?.data?.message,
        });
    }
}
// ----------------------------------------------------------------
export function* onLoadOurProducts() {
    yield takeLatest(types.LOAD_OUR_PRODUCTS_START, onLoadOurProductssStartAsync);
}
export function* onGetSingleProduct() {
    yield takeLatest(types.GET_SINGLE_PRODUCT_START, onGetSingleProductStartAsync);
}
export function* onaddOurProduct() {
    yield takeLatest(types.ADD_OUR_PRODUCT_START, onaddOurProductStartAsync);
}
export function* onDeleteOurProduct() {
    yield takeLatest(types.DELETE_OUR_PRODUCT_START, onDeleteOurProductStartAsync);
}

const ourProductssagas = [
    fork(onLoadOurProducts),
    fork(onGetSingleProduct),
    fork(onaddOurProduct),
    fork(onDeleteOurProduct),
];

export default function* ourProductssaga() {
    yield all([...ourProductssagas]);
}
