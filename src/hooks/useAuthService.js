import React from 'react'
import useAxiosInstance from './useAxiosInstance';

export default function useAuthService() {

    const { instance } = useAxiosInstance();

    const resourceUrl = '/auth';

    const login = async (username, password) => {
        const payload = {
            username,
            password
        }

        try {
            const response = await instance.post(`${resourceUrl}/login`, payload);
            // setToken(response.data.token);
            setUser(response.data.data);
            return response.data.data;
        } catch (error) {
            logout();
            throw error;
        }
    }

    const logout = () => {
        removeToken();
        removeUser();
    }


    const setToken = (token) => {
        localStorage.setItem('token', token);
    }

    const getToken = () => {
        return localStorage.getItem('token');
    }

    const removeToken = () => {
        localStorage.removeItem('token');
    }

    const setUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
    }

    const getUser = () => {
        return JSON.parse(localStorage.getItem('user'))
    }

    const removeUser = () => {
        localStorage.removeItem('user');
    }



    return {
        login,
        logout,
        getUser
    }
}
