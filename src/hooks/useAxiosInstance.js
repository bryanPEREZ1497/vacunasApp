import React, { useContext } from 'react'
import axios from 'axios';

const api = 'http://localhost:4000/api/v1';

export default function useAxiosInstance() {


    const instance = axios.create({
        baseURL: api,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    // instance.interceptors.request.use(function (config) {
    //     config.headers['Authorization'] = `Bearer ${authService.getToken()}`;
    //     return config;
    // }, function (error) {
    //     messageService.error(error);
    //     return Promise.reject(error);
    // });

    // instance.interceptors.response.use(function (response) {
    //     return response;
    // }, function (error) {
    //     if ((error.request.status === 403 || error.request.status === 401 || error.request.status === 423)) {
    //         // messageService.error('Su sesión ha expirado');
    //         // logOut();
    //         // cleanState()
    //     }
    //     if ((error.request.status >= 500)) {
    //         // messageService.error('Error del servidor');
    //     }
    //     return Promise.reject(error);
    // });


    return {
        instance
    }
}
