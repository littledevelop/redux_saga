import * as types from '../ActionTypes/ourServicesActionTypes'
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";


import {
     loadOurServicesSuccess, loadOurServicesError ,
     getSingleServiceSuccess, getSingleServiceError ,
     addOurServiceSuccess, addOurServiceError,
     deleteOurServiceSuccess, deleteOurServiceError,
     updateOurServiceSuccess, updateOurServiceError
     
    } from '../Actions/ourServicesActions';
import {
     loadOurServicesApi,
     getSingleServiceApi,
     addOurServiceApi,
     deleteServiceApi,
     updateOurServiceApi
      } from '../APIs/ourServicesApi';

import { Link } from "@mui/material";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
});
// ----------------------------------------------------------------
export function* onLoadOurServicesStartAsync() {
    try {
        const response = yield call(loadOurServicesApi);
        if (response.status === 200) {
            yield put(loadOurServicesSuccess(response));
        }
    } catch (error) {
        yield put(loadOurServicesError(error));
    }
}
// ----------------------------------------------------------------
export function* onGetSingleServiceStartAsync({ payload }) {
    try {
        const response = yield call(getSingleServiceApi, payload)
        if (response.status === 200) {
            yield put(getSingleServiceSuccess(response.data));
        }
    } catch (error) {
        yield put(getSingleServiceError(error.response));
    }
}
// ----------------------------------------------------------------
export function* onaddOurServiceStartAsync({payload}) {
    try {
        const response = yield call(addOurServiceApi, payload);
        if (response?.status === 200) {
            yield put(addOurServiceSuccess(response));
            Toast.fire({
                icon: "success",
                title: response?.data?.message,
            });
        }
    } catch (error) {
        yield put(addOurServiceError(error.response));
    }
}
// ----------------------------------------------------------------
export function* onDeleteOurServiceStartAsync({ payload }) {
    try {
        const response = yield call(deleteServiceApi, payload)
        if (response.status === 200) {
            yield put(deleteOurServiceSuccess(response.data));
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
        yield put(deleteOurServiceError(error.response));
        Toast.fire({
            icon: "error",
            title: error?.response?.data?.message,
        });
    }
}
// ----------------------------------------------------------------
export function* onUpdateOurServicetartAsync({ payload }) {
    try {
        const response = yield call(updateOurServiceApi, payload)
        console.log('update service response~~~~~>',response)
        if (response.status === 200) {
            yield put(updateOurServiceSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: response.data.message,
            });
        } else {
            Toast.fire({
                icon: "error",
                title: response.data,
            });
        }
    } catch (error) {
        yield put(updateOurServiceError(error));
        if(error?.response?.data?.title) {
            Toast.fire({
                icon: "error",
                title: error.response.data.title,
            })
        }else if(error?.response?.data?.description) {
            Toast.fire({
                icon: "error",
                title: error.response.data.description,
            })
        } else if(error?.response?.data.image) {
            Toast.fire({
                icon: "error",
                title: error.response.data.image,
            })
        } else if(error?.response?.data?.file){
            Toast.fire({
                icon: "error",
                title: error.response.data.file,
            })
        } else {
            Toast.fire({
                icon: "error",
                title: error?.response?.data?.type_of_av,
            })
        }
    }
}
// ----------------------------------------------------------------


export function* onLoadOurServices() {
    yield takeLatest(types.LOAD_OUR_SERVICES_START, onLoadOurServicesStartAsync);
}

export function* onGetSingleService() {
    yield takeLatest(types.GET_SINGLE_SERVICE_START, onGetSingleServiceStartAsync);
}
export function* onaddOurService() {
    yield takeLatest(types.ADD_OUR_SERVICE_START, onaddOurServiceStartAsync);
}
export function* onDeleteOurService() {
    yield takeLatest(types.DELETE_OUR_SERVICE_START, onDeleteOurServiceStartAsync);
}
export function* onUpdateOurService() {
    yield takeLatest(types.UPDATE_OUR_SERVICE_START, onUpdateOurServicetartAsync);
}

const ourServicessagas = [
    fork(onLoadOurServices), 
    fork(onGetSingleService), 
    fork(onaddOurService), 
    fork(onDeleteOurService), 
    fork(onUpdateOurService), 
];

export default function* ourServicessaga() {
    yield all([...ourServicessagas]);
}
