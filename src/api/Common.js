
import request from "@/request/axiosApi";
// import db from "@/utils/localstorage";

const apiList = {
  // 获取当前系统的所有枚举
  dictionaryEnums: "/gate/dictionary/enums"
};

export default {
  // uploadFile: `${process.env.VUE_APP_DEV_REQUEST_DOMAIN_PREFIX}${process.env.VUE_APP_BASE_API}/file/attachment/upload`,
  // loadImg(data) {
  //   const token = db.get("TOKEN", "");
  //   const tenant = db.get("TENANT", "");
  //   return `${process.env.VUE_APP_DEV_REQUEST_DOMAIN_PREFIX}${process.env.VUE_APP_BASE_API}/file/attachment/download/${data.bizType}/${data.bizId}?token=${token}&tenant=${tenant}`;
  // },
  dictionaryEnums() {
    return request({
      method: "GET",
      url: apiList.dictionaryEnums
    });
  },
  // 生成id
  generateId(data) {
    return request({
      url: "/authority/common/generateId",
      method: "GET",
      data
    });
  },
  // 查询附件
  getAttachment(data) {
    return request({
      url: "/file/attachment",
      method: "get",
      data
    });
  },
  // 删除附件
  deleteAttachment(data) {
    return request({
      url: "/file/attachment",
      method: "delete",
      data
    });
  },
  // 下载附件
  downloadAttachment(data) {
    return request({
      url: "/file/attachment/download",
      method: "get",
      responseType: "blob",
      data
    });
  },
  // 根据业务类型/业务id打包下载
  downloadAttachmentBiz(data) {
    return request({
      url: "/file/attachment/download/biz",
      method: "get",
      responseType: "blob",
      data
    });
  },

  // 菜单
  getUaaMenuById(id) {
    return request({
      url: `/api/uaa/menu/${id}`,
      method: "get"
    });
  },

  // 列表列头加载
  getTableHead(data) {
    return request({
      url: "/api/dictionary/userDefinedColumn/selectDefinedColumn",
      method: "POST",
      data,
      headers: {
        cancelToken:
          data && data.cancelToken !== undefined
            ? data.cancelToken
            : "COMMON_TABLE_HEAD"
      }
    });
  },
  // 可编辑列表列头加载
  getTableEditHead(data) {
    return request({
      url: "/api/dictionary/userDefinedColumn/selectEditDefinedColumn",
      method: "POST",
      data,
      headers: {
        cancelToken:
          data && data.cancelToken !== undefined
            ? data.cancelToken
            : "COMMON_TABLE_EDIT_HEAD"
      }
    });
  },
  // 修改自定义表头
  updateTablehead(data) {
    return request({
      url: "/api/dictionary/userDefinedColumn/updateUserDefinedColumn",
      method: "POST",
      data
    });
  },

  // form表单提交,默认post，可传method
  formSubmit({ url, method = "POST", data }) {
    return request({
      url,
      method,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data
    });
  },
  // 还原自定义表头
  resetTableHead(data) {
    return request({
      url: "/api/dictionary/userDefinedColumn/resetUserDefinedColumn",
      method: "POST",
      data
    });
  },
  // 获取自定义公共查询条件Api
  getSearchFormItem(data) {
    return request({
      url: "/api/dictionary/userDefinedColumn/findDefinedFilter",
      method: "GET",
      data
    });
  },
  // 修改自定义查询条件
  saveSearchFormItem(data) {
    return request({
      url: "/api/dictionary/userDefinedColumn/updateUserDefinedFilter",
      method: "POST",
      data
    });
  },
  // 获取查询条件是否启用(默认显示)的接口
  isEnableUserDefinedFilter(data) {
    return request({
      url: "/api/dictionary/userDefinedColumn/isEnableUserDefinedFilter",
      method: "GET",
      data
    });
  },
  // 设置查询条件启用(默认显示)接口
  enableUserDefinedFilter(data) {
    return request({
      url: "/api/dictionary/userDefinedColumn/enableUserDefinedFilter",
      method: "POST",
      data
    });
  }
};
