import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import login from './login';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        login,
    },
});
