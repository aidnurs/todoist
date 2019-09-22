<template lang="html">
    <div class="">
        <h1>Login</h1>
        <hr />
        <div class="row justify-content-around" v-if="!this.$store.getters.isAuthenticated">
            <form class="col-4" @submit.prevent="sendLoginForm" method="post">
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

            <form class="col-4" @submit.prevent="sendSignUpForm" method="post">
                <div class="form-group">
                    <label for="exampleInputEmail1">Username</label>
                    <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Username"
                        v-model="newUser.username"
                    />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        v-model="newUser.password"
                    />
                </div>
                <button type="submit" class="btn btn-primary">Signup</button>
            </form>
        </div>
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
            newUser: {
                username: '',
                password: '',
            },
        };
    },
    methods: {
        sendLoginForm() {
            this.$store
                .dispatch('AUTH_REQUEST', this.user)
                .then((resp) => {})
                .catch((err) => {
                    throw err;
                });
        },
        sendSignUpForm() {
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
            this.$store.dispatch('AUTH_LOGOUT').then(() => {
                this.$router.go('/');
            });
        },
    },
    // mounted() {},
});
</script>

<style lang="css" scoped></style>
