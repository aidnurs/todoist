<template lang="html">
    <div class="">
        <br />
        <b-form
            inline
            class="justify-content-center"
            @submit.prevent="onSubmit"
            v-if="!this.$store.getters.isAuthenticated"
        >
            <label class="sr-only" for="inline-form-input-name">Name</label>
            <b-input
                id="inline-form-input-name"
                class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="Username"
                v-model="user.username"
            ></b-input>

            <label class="sr-only" for="inline-form-input-username">Username</label>
            <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
                <b-input
                    id="inline-form-input-username"
                    placeholder="Password"
                    v-model="user.password"
                ></b-input>
            </b-input-group>

            <!-- <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox> -->

            <b-button type="submit" variant="primary">Login</b-button>
        </b-form>
        <div class="">
            {{ this.$store.state.login.token }}
        </div>
        <button
            type="button"
            name="button"
            @click="logout"
            v-if="this.$store.getters.isAuthenticated"
        >
            logout
        </button>
        <!-- <form @submit.prevent="registerNewUser" class="" method="post">
            <label for="username" required>username</label>
            <input type="text" name="username" value="" v-model="user.username" />
            <br />
            <button type="submit" name="button">Register</button>
        </form> -->
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
            this.$store.dispatch('AUTH_REQUEST', this.user);
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
