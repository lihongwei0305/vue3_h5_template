import request from '../request/axiosApi';

const apiList = {
  annologin: {
    method: 'POST',
    url: `/api/uaa/anno/login`,
  },
  getRandomNumber: {
    method: 'POST',
    url: `/api/uaa/random/queryRandom`,
  },
  uKeyLogin:{
    method: 'POST',
    url: `/api/uaa/anno/uKeylogin`,
  },
};

export default {
  annologin(data) {
    return request({
      ...apiList.annologin,
      data,
    });
  },
  //获取uKey登录随机数
  getRandomNumber(){
    return request({
      ...apiList.getRandomNumber
    });
  },
  //uKey登录
  uKeyLogin(data){
    return request({
      ...apiList.uKeyLogin,
      data,
    });
  }
};
