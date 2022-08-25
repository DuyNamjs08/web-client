import { call, take, put, all, } from 'redux-saga/effects'
import { registerUser, loginUser, logoutUser } from '../utils/authFirebase'
import {
    AUTH_START, authSuccess, authFail, LOGOUT_START, logoutSuccess, logoutFail,
} from '../redux/action'



function* authenticate({ email, password, isRegister,firstName,lastName }) {
    let data
    try {
        if (isRegister) {
            console.log("isRegister :", isRegister);
            data = yield call(registerUser, { email, password,firstName,lastName });
            console.log('data register :' , data.user.uid);
        } else {
            data = yield call(loginUser, { email, password });
            console.log("data login123 :" , data.user);
        }
        yield put(authSuccess(data.user.uid));
        return data.user.uid

    } catch (error) {
        yield put(authFail(error.message));
        console.log("error.message", error.message);
    }
}
function* logout() {
    try {
        yield call(logoutUser)
        console.log('logout - start');
        yield put(logoutSuccess())
    }
    catch (error) {
        yield put(logoutFail())
    }
}
function* authFlow() {
    while (true) {
        const {payload} = yield take(AUTH_START);
        console.log('isRegister :: ', payload.isRegister);
        const uid = yield call(authenticate, payload);
        console.log('uid :', uid);
        if (uid) {
            yield take(LOGOUT_START);
            yield call(logout);
        }
    }
}
function* Saga() {
    yield all([authFlow()])

}

export default Saga;