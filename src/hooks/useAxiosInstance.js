import React, { useContext } from 'react'
import axios from 'axios';
import useAuthService from './useAuthService';
import { messageService } from '../services/messageService';

const api = 'https://pokeapi-expressjs.herokuapp.com/api/v1';

const { getToken } = useAuthService();
export default function useAxiosInstance() {

    const instance = axios.create({
        baseURL: api,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    instance.interceptors.request.use(function (config) {
        config.headers['Authorization'] = `Bearer ${getToken()}`;
        return config;
    }, function (error) {
        messageService.error(error);
        return Promise.reject(error);
    });

    return {
        instance
    }
}
