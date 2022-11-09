import {defineStore} from 'pinia'


const useTabBarStore = defineStore("tabBar", {
    state() {
        return {
            active: ''
        }
    },

    actions: {
        setActive(data) {
            this.active = data
        }
    },

    persist: {
        enabled: true
    },


});

export default useTabBarStore