import querystring from 'querystring';

export default {
    state: {
        token: localStorage.getItem('todoist-token') || '',
        status: '',
        hasLoadedOnce: false,
    },
    mutations: {
        AUTH_REQUEST(state: any) {
            state.status = 'loading';
        },
        AUTH_SUCCESS(state: any, token: string) {
            state.status = 'success';
            state.token = token;
            state.hasLoadedOnce = true;
        },
        AUTH_ERROR(state: any) {
            state.status = 'error';
            state.hasLoadedOnce = true;
        },
        AUTH_LOGOUT(state: any) {
            state.token = '';
        },
    },
    actions: {
        AUTH_REQUEST({ commit, dispatch }: any, user: any) {
            return new Promise((resolve, reject) => {
                // The Promise used for router redirect in login
                commit('AUTH_REQUEST');

                const data = querystring.stringify(user);

                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    const resp = JSON.parse(xhr.response);
                    localStorage.setItem('todoist-token', resp.token); // store the token in localstorage
                    commit('AUTH_SUCCESS', resp.token);
                    resolve(resp.token);
                };

                xhr.onerror = () => {
                    reject();
                };

                xhr.open('POST', process.env.VUE_APP_BACKEND + '/api/users/login');
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                xhr.send(data);
            });
        },
        AUTH_LOGOUT({ commit, dispatch }: any) {
            return new Promise((resolve, reject) => {
                commit('AUTH_LOGOUT');
                localStorage.removeItem('user-token'); // clear your user's token from localstorage
                resolve();
            });
        },
    },
    getters: {
        isAuthenticated: (state: any) => !!state.token,
    },
};
