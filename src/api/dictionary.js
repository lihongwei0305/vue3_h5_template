import axiosApi from '@/request/axiosApi.js';


export default {

    page(data) {
        return axiosApi({
            method: 'POST',
            url: '/api/dictionary/otheritem/page',
            data,
        });
    },
};