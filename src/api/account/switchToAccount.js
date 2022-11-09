/*
 * @Author: raojiaguan
 * @Date: 2020-8-04 10:57
 * @Last Modified by: raojiaguan
 * @Description:核算切换账套相关api
 */
import axiosApi from "@/request/axiosApi.js";

export default {
    //树形数据查询
    selectTree(data) {
        return axiosApi({
            url: `/api/glaaccount/acctSetSwith/getAcctSetSwithList`,
            method: 'POST',
            data
        })
    },
    //树形数据查询
    getRoles() {
        return axiosApi({
            url: `/api/glaaccount/acctSetSwith/getRoles`,
            method: 'POST',
        })
    },

    //刷新令牌
    refreshToken(data) {
        return axiosApi({
            url: `/api/uaa/token/refresh`,
            method: 'POST',
            data
        })
    },
    getDefaultAcctSet() {
        return axiosApi({
            url: `/api/glaaccount/glaacctset/getDefaultAcctSet`,
            method: 'GET',
        })
    },
    glaAcctSetById(data) {
        return axiosApi({
            url: `/api/glaaccount/glaacctset/glaAcctSetById`,
            method: 'GET',
            data
        })
    }
}