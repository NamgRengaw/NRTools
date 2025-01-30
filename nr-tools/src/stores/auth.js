import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        login(data) {
            this.user = data.user;
            this.token = data.token;
            localStorage.setItem('token', this.token)
        },
        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem('token')
        },
        checkAuth() {
            const token = localStorage.getItem('token');
            if(token) {
                this.token = token;
            }
        }
    }
});