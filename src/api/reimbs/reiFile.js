
import axiosApi from '@/request/axiosApi';

const prefix = '/api/reimbs/reiFile';
const [methodGet, methodPost, methodPut, methodDelete] = ['GET', 'POST', 'PUT', 'DELETE'];


export default {
  // 差旅费查询
  validation(data) {
    return axiosApi({
      method: methodPost,
      url: `${prefix}/batchupload`,
      data,
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  },
  uploadInvoice(data) {
    return axiosApi({
      method: methodPost,
      url: `${prefix}/uploadInvoice`,
      data,
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  },

  batchupload(data) {
    return axiosApi({
      method: methodPost,
      url: `/api/fileserver/file/batchupload`,
      data,
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  },
};
