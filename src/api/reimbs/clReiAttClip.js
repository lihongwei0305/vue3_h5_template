import axiosApi from "@/request/axiosApi";

const prefix = '/api/reimbs/clReiAttClip'

export default {
    // 设置查询条件启用(默认显示)接口
    pageNew(data) {
        return axiosApi({
            url: `${prefix}/pageNew`,
            method: "POST",
            data
        });
    },
    saveS(data) {
        return axiosApi({
            method: 'POST',
            url: `${prefix}/saveS`,
            data,
        });
    },
    // 删除
    remove(data) {
        return axiosApi({
            method: 'POST',
            url: `${prefix}/delete`,
            data,
        });
    },
};
