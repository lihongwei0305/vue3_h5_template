import Common from "../api/Common.js";
import {ref} from "vue";
import {Toast} from 'vant'

export function useCommonRequest() {
    const getTableColumn = async (params) => {
        let {data: res} = await Common.getTableEditHead({
            commBillId: "-1",
            ...params
        })
        if (!(res.code === 0 || res.code === 200)) {
            return Toast.fail("请求失败!");
        }
        return res?.data

    }

    const deleteRequest = async (api, params) => {
        Toast.loading({duration: 0})
        let {data: res} = await api(params)
        if (!(res.code === 0 || res.code === 200)) return Toast.fail("删除失败!");
        Toast.success('删除成功!')

    }

    return {
        getTableColumn,
        deleteRequest
    }

}