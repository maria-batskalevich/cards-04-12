import axios from 'axios';
import {ApiResponseTypes, AuthLoginResponseTypes, AuthLoginTypes, RegisterParamsType} from "./ApiResponseTypes";


// const settings = {
//     withCredentials: true,
//     headers: {
//         'API-KEY': ''
//     }
// }

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    // ...settings
});

export const API = {
    appAPI: {
        fakeRequest: (param: string) =>
            instance.post<string, ApiResponseTypes>('', {param}),
    },
    loginAPI: {
        login: (param: AuthLoginTypes) => instance.post<AuthLoginTypes, ApiResponseTypes<{ data: AuthLoginResponseTypes }>>('auth/login', param),
    },
    recoveryPasswordAPI: {
        recoveryPass: (param: string) =>
            instance.post<string, ApiResponseTypes>('', {param}),
    },
    registration(param: RegisterParamsType) {
        return instance.post<{ addedUser: AuthLoginResponseTypes }>('/auth/register', param)
    },
};


// export const authAPI = {
//     login(data: LoginParamsType) {
//         return instance.post<AuthResponseType| {error: string}>('auth/login', {...data})
//     },
//     logOut(data: {}) {
//         return instance.delete<{info: string} | {error: string}>('auth/me', {})
//     },
//     registration(data: {email: string, password: string}) {
//         return instance.post<{addedUser: AuthResponseType}>('/auth/register', data)
//     },
//     me(data: {}) {
//         return instance.post<AuthResponseType>('/auth/me', data)
//     }
// }