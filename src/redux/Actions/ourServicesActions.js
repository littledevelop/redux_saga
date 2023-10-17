import * as types from '../ActionTypes/ourServicesActionTypes';
// ------------------------------------------------------------------
export const loadOurServicesStart = () => ({
    type: types.LOAD_OUR_SERVICES_START,
});

export const loadOurServicesSuccess = (status) => ({
    type: types.LOAD_OUR_SERVICES_SUCCESS,
    payload: status,
});

export const loadOurServicesError = (error) => ({
    type: types.LOAD_OUR_SERVICES_ERROR,
    payload: error,
});
// ------------------------------------------------------------------
export const getSingleServiceStart = (singleService) => ({
    type: types.GET_SINGLE_SERVICE_START,
    payload: singleService,
});

export const getSingleServiceSuccess = (singleService) => ({
    type: types.GET_SINGLE_SERVICE_SUCCESS,
    payload: singleService,
});

export const getSingleServiceError = (error) => ({
    type: types.GET_SINGLE_SERVICE_ERROR,
    payload: error,
})
// ------------------------------------------------------------------
export const addOurServiceStart = (newService) => ({
    type: types.ADD_OUR_SERVICE_START,
    payload: newService,
});

export const addOurServiceSuccess = (newService) => ({
    type: types.ADD_OUR_SERVICE_SUCCESS,
    payload: newService,
});

export const addOurServiceError = (error) => ({
    type: types.ADD_OUR_SERVICE_ERROR,
    payload: error,
});
// ------------------------------------------------------------------
export const deleteOurServiceStart = (deleteOurService) => ({
    type: types.DELETE_OUR_SERVICE_START,
    payload: deleteOurService,
});

export const deleteOurServiceSuccess = (deleteOurService) => ({
    type: types.DELETE_OUR_SERVICE_SUCCESS,
    payload: deleteOurService,
});

export const deleteOurServiceError = (error) => ({
    type: types.DELETE_OUR_SERVICE_ERROR,
    payload: error,
});
// ------------------------------------------------------------------

export const updateOurServiceStart = (updateOurService) => ({
    type: types.UPDATE_OUR_SERVICE_START,
    payload: updateOurService,
});

export const updateOurServiceSuccess = (updateOurService) => ({
    type: types.UPDATE_OUR_SERVICE_SUCCESS,
    payload: updateOurService,
});

export const updateOurServiceError = (error) => ({
    type: types.UPDATE_OUR_SERVICE_ERROR,
    payload: error,
});


