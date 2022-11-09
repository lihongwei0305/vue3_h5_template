import {Toast} from "vant";
import currency from "currency.js";

/**
 * 比较时间
 * @param start
 * @param end
 * @returns {boolean}
 */
export function dateCompare(start, end) {
    if (!start || !end) return
    let startTime = new Date(start).getTime()
    let endTime = new Date(end).getTime()
    if (endTime <= startTime) {
        Toast('结束时间要大于开始时间')
    }
    return endTime <= startTime
}


/**
 * 比较标准金额与金额
 * @param moneyStandard 标准金额
 * @param money 合计金额
 * @returns {boolean}
 */
export function moneyCompare(moneyStandard, money) {
    return currency(moneyStandard).subtract(money).value < 0
}


/**
 * generateUUID 生成UUID
 * @returns {string} 返回字符串
 */
export function generateUUID() {
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
}

/**
 *  _ 后的后一位转成大写
 * @param str
 * @returns {string}
 */

export function toUp(str) {
    let newStr = ''
    let arr = str.split('_')

    arr.forEach((item, index) => {
        if (index > 0) {
            return newStr += item.replace(item[0], item[0].toUpperCase())
        } else {
            return newStr += item
        }
    })
    return newStr
}


/***
 *
 * @param key
 * @returns {any}
 */

export function storageGetItem(key) {
    return JSON.parse(localStorage.getItem(key))
}

export function storageSetItem(key, value) {
    return localStorage.setItem(key, JSON.stringify(value))
}


export function addIdCodeName(param) {
    Object.keys(param).forEach((v) => {
        let key = v.replace(/Id$/, '');
        let cur = data[v].filter((c) => param[v] == c.value).pop();
        param[`${key}Id`] = cur.value;
        param[`${key}Code`] = cur.label.split('-')[0];
        param[`${key}Name`] = cur.label.split('-')[1];
    });
}


export function isEmpty(val) {
    if(/^\s*$/.test(val)) return true
    if (val == null || val == 0 ) return true;
    if (val instanceof Object) {
        return !Object.keys(val).length
    }
    if (val instanceof Array) {
        return !val.length
    }
}

export function formatPickerData(options) {
    options.forEach(v=>{

    })
}


