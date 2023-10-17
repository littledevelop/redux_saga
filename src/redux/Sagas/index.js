import { all } from "redux-saga/effects";
import userSaga from "./usersagas";
import ourServicessaga from "./ourServicessagas";
import ourProductssaga from "./ourProductssagas";

export default function* rootSaga() {
    yield all([
        userSaga(),
        ourServicessaga(),
        ourProductssaga(),
    ]);
}
