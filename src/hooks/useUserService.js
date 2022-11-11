import React from 'react'
import useAxiosInstance from './useAxiosInstance';

export default function useUserService() {

    const { instance } = useAxiosInstance();

    const resourceUrl = '/users';

    async function getUsers(search = '', startedDate='', endedDate='') {
        const response = await instance.get(`${resourceUrl}`, {
            params: {
                search,
                startedDate,
                endedDate
            }
        });

        return response.data.data;
    }

    async function getUser(userId) {
        const response = await instance.get(`${resourceUrl}/${userId}`);
        return response.data.data;
    }

    async function storeUser(user) {
        const response = await instance.post(`${resourceUrl}`, user);
        return response.data.data;
    }

    async function editUser(user) {
        const response = await instance.put(`${resourceUrl}/${user.id}`, user);
        return response.data.data;
    }

    async function deleteUser(userId) {
        const response = await instance.delete(`${resourceUrl}/${userId}`);
        return response.data.data;
    }




    return {
        getUsers,
        getUser,
        storeUser,
        editUser,
        deleteUser
    }
}
