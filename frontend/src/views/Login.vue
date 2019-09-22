<template lang="html">
    <div class="">
        <form
            class="justify-content-center"
            @submit.prevent="onSubmit"
            v-if="!this.$store.getters.isAuthenticated"
            method="post"
        >
            <div class="form-group">
                <label for="exampleInputEmail1">Username</label>
                <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Username"
                    v-model="user.username"
                />
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    v-model="user.password"
                />
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
        <div class="" v-else>
            <button @click="logout" class="btn btn-primary" type="button" name="button">
                Logout
            </button>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import querystring from 'querystring';

export default Vue.extend({
    data() {
        return {
            user: {
                username: '',
                password: '',
            },
        };
    },
    methods: {
        onSubmit() {
            this.$store
                .dispatch('AUTH_REQUEST', this.user)
                .then((resp) => {})
                .catch((err) => {
                    throw err;
                });
        },
        registerNewUser() {
            const data = querystring.stringify(this.user);
            axios
                .post(process.env.VUE_APP_BACKEND + '/api/users', data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        logout() {
            this.$store.dispatch('AUTH_LOGOUT');
        },
    },
    // mounted() {},
});
</script>

<style lang="css" scoped></style>
