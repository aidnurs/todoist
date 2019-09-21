import querystring from 'querystring';
import Vue from 'vue';

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

                    const xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        commit('USER_SUCCESS');
                        resolve(xhr.response);
                    };

                    xhr.onerror = () => {
                        commit('USER_ERROR');
                        reject(xhr.response);
                        dispatch('AUTH_LOGOUT');
                    };
                    xhr.open('GET', process.env.VUE_APP_BACKEND + '/api/users/me');
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.setRequestHeader('x-access-token', localStorage.getItem(
                        'todoist-token',
                    ) as string);

                    xhr.send();
                });
            }
        },
    },
    getters: {},
};
