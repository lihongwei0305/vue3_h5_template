import {defineStore} from 'pinia'
import loginApi from "../api/login.js";
import {Toast} from "vant";


const useUserStore = defineStore("user", {
    state: () => {
        return {
            userInfo: {}
        }
    },
    getters: {
        getUser() {
            return this.userInfo.user
        },
        isLogin() {
            return !!this.userInfo.token
        }
    },
    actions: {
        setUserInfo(data) {
            this.userInfo = data
        },


        async login(params) {
            let toast = Toast.loading({
                message: "登陆中..."
            })

            let {data: res} = await loginApi.annologin(params).finally(() => toast.close())
            if (!(res.code === 0 || res.code === 200)) {
                return
            }
            let now = new Date().getDate()
            window.sessionStorage.setItem('lastLoginTime', JSON.stringify(now));
            if (res.data.msg === '验证码已过期' || res.data.msg === '用户名或密码错误') {
                // this.loginLoading = false;
                // this.loginForm.code = '';
                // this.refreshCode();
                // handleReLogin(loginResult.data.msg);
            }

            if (res.code === 0) {
                window.sessionStorage.setItem('gfmistoken', res.data.token);
                //  保存用户token信息到vuex和localstorage，后续发送的所有请求均需要在header携带上token
                this.setUserInfo(res.data)
                window.localStorage.setItem('admdivcode', params.admdivcode);
                window.localStorage.setItem('account', String(params.account));
            } else {
                // this.loginLoading = false;
                // this.$message.error(loginResult.data.msg);
                // handleReLogin(loginResult.data.msg);
            }
        }


    },
    persist: {
        enabled: true
    },
    // persist: {
    //     // 修改存储中使用的键名称，默认为当前 Store的 id
    //     key: 'user',
    //     // 修改为 user，默认为 localStorage
    //     storage: window.localStorage,
    //     // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
    //     paths: undefined,
    // }
});


export default useUserStore