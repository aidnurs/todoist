// import querystring from 'querystring';
import Vue from 'vue';
import axios from 'axios';

export default {
    state: {
        status: '',
        profile: {},
    },
    mutations: {
        USER_REQUEST(state: any) {
            state.status = 'loading';
        },
        USER_SUCCESS(state: any, resp: any) {
            state.status = 'success';
            Vue.set(state, 'profile', resp);
        },
        USER_ERROR(state: any) {
            state.status = 'error';
        },
    },
    actions: {
        USER_REQUEST({ commit, dispatch }: any) {
            if (localStorage.getItem('todoist-token')) {
                return new Promise((resolve, reject) => {
                    commit('USER_REQUEST');

                    axios
                        .get(process.env.VUE_APP_BACKEND + '/api/users/me', {
                            headers: {
                                Authorization: localStorage.getItem('todoist-token') as string,
                            },
                        })
                        .then((resp) => {
                            commit('USER_SUCCESS');
                            resolve(resp);
                        })
                        .catch((err) => {
                            commit('USER_ERROR');
                            reject(err);
                            dispatch('AUTH_LOGOUT');
                        });
                });
            }
        },
    },
    getters: {},
};
