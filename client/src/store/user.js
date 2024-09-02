import { defineStore } from 'pinia';

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: {},
        token: '',
    }),
    actions: {
        setUser(user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.user = user;
        },
        setToken(token) {
            localStorage.setItem('token', token);
            this.token = token;
        },
        clearUser() {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            this.user = {};
            this.token = '';
        },
        getUserInfo() {
            return this.user;
        },
        getToken() {
            return this.token;
        },
    },
});