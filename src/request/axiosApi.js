/*
 * @Author: chen hong
 * @Descripttion:
 * @Date: 2020-03-18 17:13:27
 *
 * 说明：
 * 1.若需不传token，则传入headers.DeleteAuthorization = true
 * 2.若需处理重复请求，传入headers.request_cancel = true
 *
 */
import axios from 'axios';
import {AxiosResponse} from 'axios';
import baseUrl from '../utils/baseUrl.js';
import router from '../router/index';
import {Toast, Dialog} from 'vant'
import switchToAccountApi from '@/api/account/switchToAccount';

// let {CancelToken} = axios;
// let __cancels__ = {};

const pendingMap = new Map();

let errorMsg = null;
let routerNameToInfo = {};


axios.interceptors.request.use((config) => {
    if (!config?.headers) {
        return false;
    }

    // DeleteAuthorization则不传token
    if (!config.headers.DeleteAuthorization) {
        config.headers.Authorization = window.sessionStorage.getItem('gfmistoken');
    }

    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo') || '{}');
    let defaultyearObj = JSON.parse(window.sessionStorage.getItem('defaultyearObj') || '{}');

    let homeIndex = router.options.routes.findIndex(item => item.name === 'home');
    let routerInfo = {
        G_AccYear: userInfo?.syssets?.G_AccYear?.fparamdata || '',
        G_BudgetYear: userInfo?.syssets?.G_BudgetYear?.fparamdata || '',
        fadmdivcode: userInfo?.user?.fadmdivcode || ''
    };

    if (homeIndex !== -1) {
        let hrefArr = window.location.href.split('/');
        let name = hrefArr[hrefArr.length - 1];
        // if (name && routerNameToInfo[name]) {
        //   routerInfo = routerNameToInfo[name];
        // } else {
        let list = router?.options?.routes[homeIndex]?.children || [];
        getRouterInfo(list, name, routerInfo, defaultyearObj);
        // }
    }
    config.headers = {...routerInfo, ...config.headers};

    // 请求的key处理
    removePending(config);
    config?.headers?.request_cancel && addPending(config);

    return config;
});

// 接口返回处理
axios.interceptors.response.use(
    (response) => {
        removePending(response.config);
        return response;
    },
    (error) => {
        error?.config && removePending(error.config);
        return Promise.reject(error);
    }
);

const handleError = (error, reject) => {
    // 处理被取消的请求
    if (axios.isCancel(error)) {
        return console.error('请求的重复请求：' + error.message);
    }
    let errMsg = '请求错误';
    if (error.code === 'ECONNABORTED') {
        errMsg = '请求超时';
    } else if (error.response && error.response.data) {
        errMsg = error.response.data.status === 503 ? '系统升级中，请稍后再试~' : (error.response.data.error || error.response.data);
    } else if (error.message) {
        errMsg = error.message;
    }
    errorMsg && errorMsg.close();
    errorMsg = Toast({
        showClose: true,
        message: errMsg,
        duration: 2000,
        type: 'error',
        dangerouslyUseHTMLString: true
    });
    reject(error);
};

const handleSuccess = (res, resolve, reject) => {
    if (res.status == 200 && res.config.responseType == 'blob') {
        resolve(res);
    } else if (res?.data?.code === 0 || res?.data?.code == 200 || res?.data?.isSuccess) {
        resolve(res);
    } else if (res.data.isError) {
        // 未登录
        // 40001   会话超时，请重新登录
        // 40003   请重新登录
        // 40005   解析用户身份错误，请重新登录
        if ([40001, 40003, 40005].includes(res.data.code)) {
            let pathname = window.location.pathname;
            if (pathname && pathname !== '/login') {
                errorMsg && errorMsg.close();
                Dialog.alert({
                    title: '提示',
                    message: res.data.msg
                }).then(() => {
                    let admdivcode = localStorage.getItem('admdivcode');
                    let account = localStorage.getItem('account');
                    // 超时退出后将 localStorage 和 sessionStorage清空
                    window.localStorage.clear();
                    window.sessionStorage.clear();
                    window.location.href = '/login';
                    window.localStorage.setItem('admdivcode', admdivcode);
                    window.localStorage.setItem('account', account);
                })
            }
        } else {
            errorMsg && errorMsg.close();
            errorMsg = Toast({
                showClose: true,
                message: res.data.msg,
                duration: 2000,
                type: 'error',
                dangerouslyUseHTMLString: true
            });
            reject(res);
        }
    } else {
        if (res.data.code === 500) {
            resolve(res);
        } else {
            errorMsg && errorMsg.close();
            errorMsg = Toast({
                showClose: true,
                message: '网络请求失败',
                duration: 2000,
                type: 'error'
            });
            reject(res);
        }

    }

};
let getRouterInfo = (list, name, routerInfo, defaultyearObj) => {
    list.map(item => {
        if (item?.name === name) {
            routerInfo.fbilltypeno = item?.meta?.fbilltypeno;
            routerInfo.fmethodno = item?.meta?.fmethodno;
            routerInfo.fopermethodno = item?.meta?.fopermethodno;
            if (item.meta?.year) {
                let rName = item.path.split('/')[2];
                if (defaultyearObj[rName]) {
                    routerInfo.defaultyear = defaultyearObj[rName];
                    routerInfo[defaultyearObj[rName]] = item.meta.year;
                }
            }
            routerNameToInfo[name] = routerInfo;
            return;
        }

        if (item.children?.length) {
            getRouterInfo(item.children, name, routerInfo, defaultyearObj);
        }
    });
};
// 获取类型
const getDataType = (o) => {
    if (o === null) {
        return 'null';
    } else if (typeof o == 'object') {
        if (typeof o.length == 'number') {
            return 'Array';
        } else {
            return 'Object';
        }
    } else if (typeof o == 'number') {
        return 'number';
    } else if (typeof o == 'string') {
        return 'string';
    } else {
        return 'null';
    }
};
// 处理前后空格
const handleValue = (data) => {
    for (let key in data) {
        // 如果是数组
        if (getDataType(data[key]) == 'Array') {
            if (data[key].length > 0) {
                data[key].map((x) => {
                    handleValue(x);
                });
            }
        }
        // 如果是字符串
        // if (getDataType(data[key]) == 'string') {

        //   console.log(key)
        //   console.log(data[key])
        //   data[key] = data[key].trim();
        // }
    }
    return data;
};

// 刷新token令牌
const refreshToken = async () => {
    // 开始刷新令牌
    const {data: res} = await switchToAccountApi.refreshToken({})['catch']((err) => err);
    if (res.code !== 0) {
        return;
    }
    window.sessionStorage.setItem('gfmistoken', res.data);
    isRefreshToken = false;
};
// 是否正在刷新令牌
let isRefreshToken = false;

// http请求
const httpServer = async (opts) => {
    // 获取当前时间
    let nowTime = new Date().getTime();
    // 时间间隔 2小时
    let period = 1000 * 60 * 60 * 2;
    // 系统设置的过期时间 12小时
    let systemPeriod = 1000 * 60 * 60 * 12;
    // 获取最后一次请求的时间
    let lastRequestTime = window.sessionStorage.getItem('lastRequestTime');
    if (lastRequestTime && window.sessionStorage.getItem('gfmistoken')) {
        // 当前时间减去获取最后一次请求的时间大于间隔时间 并且小于12个小时 则重新刷新koken
        if (nowTime - lastRequestTime > period && nowTime - lastRequestTime < systemPeriod) {
            if (!isRefreshToken) {
                isRefreshToken = true;
                // 刷新token
                await refreshToken();
            }
        }
    }
    // 记录最后一次请求的时间
    window.sessionStorage.setItem('lastRequestTime', String(new Date().getTime()));

    //  应童老板要求 平台和基础信息的接口数据 如果是字符串的话 去掉前后空格
    let arr = ['dictionary', 'uaa', 'basicdata'];
    if (opts.url) {
        let a = opts.url.split('/')[2];
        // 需要截取前后空格
        if (arr.includes(a)) {
            if (opts.data) {
                opts.data = handleValue(opts.data);
            }

        }
    }
    // 公共参数
    const publicParams = {
        ts: Date.now()
    };
    // http默认配置
    const method = opts.method.toUpperCase();
    // baseURL
    // 开发环境： /api                 // 开发环境在 vue.config.js 中有 devServer.proxy 代理
    // 生产环境： http://IP:PORT/api   // 生产环境中 代理失效， 故需要配置绝对路径

    const httpDefaultOpts = {
        method,
        baseURL: baseUrl,
        url: opts.url,
        responseType: opts.responseType || '',
        timeout: 1200000
    };

    const dataRequest = ['PUT', 'POST', 'PATCH'];

    if (opts.headers) {
        httpDefaultOpts.headers = opts.headers;
        // if (opts.headers.cancelToken) {
        //   let cancel = __cancels__[opts.headers.cancelToken]
        //   if (cancel) {
        //     cancel()
        //     __cancels__[opts.headers.cancelToken] = undefined
        //   }
        // }
    }

    // formData转换
    if (opts.formData) {

        httpDefaultOpts.data = opts.data || {};

        httpDefaultOpts.transformRequest = [(data) => {
            const formData = new FormData();
            if (data) {
                Object.entries(data).forEach((item) => {
                    formData.append(item[0], item[1]);
                });
            }
            return formData;
        }];
    } else {
        if (dataRequest.includes(method)) {
            httpDefaultOpts.data = opts.data || {};
        } else {
            httpDefaultOpts.params = {
                ...(opts.data || {})
            };
        }
    }

    //
    const promise = new Promise((resolve, reject) => {
        axios(httpDefaultOpts).then((response) => {
            handleSuccess(response, resolve, reject);
        })
            ['catch']((error) => {
            handleError(error, reject);
        });
    });
    return promise;
};

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 * @param {*} config
 */
function addPending(config) {
    const pendingKey = getPendingKey(config);
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
        if (!pendingMap.has(pendingKey)) {
            pendingMap.set(pendingKey, cancel);
        }
    });
}

/**
 * 删除重复的请求
 * @param {*} config
 */
function removePending(config) {
    const pendingKey = getPendingKey(config);
    if (pendingMap.has(pendingKey)) {
        const cancelToken = pendingMap.get(pendingKey);
        cancelToken(pendingKey);
        pendingMap.delete(pendingKey);
    }
}

/**
 * 生成唯一的每个请求的唯一key
 * @param {*} config
 * @returns
 */
function getPendingKey(config) {
    let {url, method, params, data, headers} = config;
    if (typeof data === 'string') data = JSON.parse(data); // response里面返回的config.data是个字符串对象
    return [url, method, JSON.stringify(headers), JSON.stringify(params), JSON.stringify(data)].join('&');
}

const axiosApi = httpServer;
export {axiosApi};
export default httpServer;