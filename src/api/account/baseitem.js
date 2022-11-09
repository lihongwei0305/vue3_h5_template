/*
 * @Author: sundingliang
 * @Date: 2021-07-16 20:49:12
 * @LastEditors: sundingliang
 * @LastEditTime: 2021-07-16 20:49:28
 * @Description: file content
 * @FilePath: \xccz-assist-ui\src\api\account\baseitem.ts
 */
import axiosApi from '@/request/axiosApi.js';

const prefix = '/api/accountbase';
export default {
    // 核算树形数据查询
    tree(data) {
        return axiosApi({
            method: 'POST',
            url: `${prefix}/tree/getTree`,
            data
        });
    },
    // 执行会计制度形数据查询
    accountingSystemTree(data) {
        return axiosApi({
            method: 'get',
            url: `${prefix}/glabaseitem/accountingsystemtree`,
            data
        });
    },
    // 根据要素编码、当前登录的账套、当前行政区划及父级行政区划获取数据集树
    getGlaBaseItemTree(data) {
        return axiosApi({
            method: 'get',
            url: `${prefix}/glacommon/getGlaBaseItemTree`,
            data
        });
    },
    // 根据要素编码、当前登录的账套、当前行政区划及父级行政区划获取数据集树
    getGlaBaseItemPage(data) {
        return axiosApi({
            method: 'get',
            url: `${prefix}/glacommon/getGlaBaseItemPage`,
            data
        });
    },
    // 汇率查询
    getGlaExchangeRate(data) {
        return axiosApi({
            method: 'POST',
            url: `${prefix}/glacommon/getGlaExchangeRate`,
            data
        });
    },
    // 根据主体id列查询表科目主体和科目大类
    getAcctSubjSchemeVOListByIds(data) {
        return axiosApi({
            method: 'GET',
            url: `${prefix}/glacommon/getAcctSubjSchemeVOListByIds`,
            data
        });
    },


    baseitemFind({year, id}) {
        return axiosApi({
            method: 'GET',
            url: `/api/dictionary/baseitem/${year}/${id}`,
        });
    },
    // 要素树
    getTree(data) {
        return axiosApi({
            method: 'POST',
            url: '/api/dictionary/baseitem/tree',
            data,
        });
    },
    // 扩权县树
    countyTree(data) {
        return axiosApi({
            method: 'GET',
            url: '/api/dictionary/baseitem/countyTree',
            data,
        });
    },
};