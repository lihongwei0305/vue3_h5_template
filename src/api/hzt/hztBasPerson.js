import axiosApi from '@/request/axiosApi';

export default {
    getLoginPerson(data) {
        return axiosApi({
            url: "/api/hzt/hztBasPerson/getLoginPerson",
            method: 'POST',
            data,
        });
    },

};
