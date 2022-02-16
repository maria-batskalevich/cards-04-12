import {API} from '../../../n1-main/m3-dal/API';
import {AuthLoginTypes} from "../../../n1-main/m3-dal/ApiResponseTypes";
import {Dispatch} from "redux";
import {SetEntityStatus, SetError, SetStatusApp} from "../../../n1-main/m2-bll/app-reducer";
import {handleInternetError} from "../../../n1-main/m1-ui/common/utils";

export type initLoginStateType = {
    _id?: string | null;
    isLoggedIn: boolean;
};

const initLoginState = {
    isLoggedIn: false,
};

export const LoginReducer = (state: initLoginStateType = initLoginState, action: LoginActionTypes,
): initLoginStateType => {
    switch (action.type) {
        case 'login/LOGIN_CASE':
            return {...state, isLoggedIn: action.payload.isLoggedIn}
        default:
            return state;
    }
};

export const LoginAction = (isLoggedIn: boolean) => ({type: 'login/LOGIN_CASE', payload: {isLoggedIn}} as const);

export const LoginThunk = (param: AuthLoginTypes) => (dispatch: Dispatch) => {
    dispatch(SetStatusApp('loading'))
    dispatch(SetEntityStatus('loading'))
    API.loginAPI.login(param)
        .then(res => {
            dispatch(LoginAction(true))
            dispatch(SetStatusApp('succeeded'))
            dispatch(SetEntityStatus('succeeded'))
        })
        .catch(err => {
            handleInternetError(dispatch, err.response.message)
        })
}

export type LoginActionTypes = ReturnType<typeof LoginAction> | ReturnType<typeof SetError>