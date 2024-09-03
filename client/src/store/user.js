import { defineStore } from 'pinia';

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: uni.getStorageSync('user') || {},
        token: uni.getStorageSync('token') || '',
    }),
    actions: {
        setUser(user) {
            uni.setStorageSync('user',user);
            this.user = user;
        },
        setToken(token) {
            uni.setStorageSync('token', token);
            this.token = token;
        },
        clearUser() {
            uni.removeStorageSync('user');
            uni.removeStorageSync('token');
            this.user = {};
            this.token = '';
        },
        getUserInfo() {
            if (!this.user){
                this.user = uni.getStorageSync('user');
            }
            return this.user;
        },
        getToken() {
            if (!this.token){
                this.token = uni.getStorageSync('token');
            }
            return this.token;
        },
    },
});