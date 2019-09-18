<template lang="html">
    <div class="">
        <b-form inline class="justify-content-center" @submit.prevent="onSubmit">
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

            <b-button type="submit" variant="primary">Save</b-button>
        </b-form>

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
var querystring = require('querystring');

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
            var data = querystring.stringify(this.user);

            var xhr = new XMLHttpRequest();

            xhr.addEventListener('readystatechange', function() {
                if (this.readyState === 4) {
                    console.log(this.responseText);
                }
            });

            xhr.open('POST', process.env.VUE_APP_BACKEND + '/api/users');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr.send(data);
        },
    },
    mounted() {
        console.log(localStorage.getItem('todoist-token'));
    },
});
</script>

<style lang="css" scoped></style>
