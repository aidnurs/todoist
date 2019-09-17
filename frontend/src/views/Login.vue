<template lang="html">
    <div class="">
        <form class="" action="" method="post">
            <label for="username" required>username</label>
            <input type="text" name="username" value="" />
            <br />
            <label for="password" required>password</label>
            <input type="password" name="password" value="" />
            <br />
            <button type="submit" name="button">Login</button>
        </form>

        <form @submit.prevent="registerNewUser" class="" method="post">
            <label for="username" required>username</label>
            <input type="text" name="username" value="" v-model="user.username" />
            <br />
            <button type="submit" name="button">Register</button>
        </form>
    </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
var querystring = require('querystring');

export default Vue.extend({
    methods: {
        registerNewUser() {
            var data = querystring.stringify(this.user);

            var xhr = new XMLHttpRequest();

            xhr.addEventListener('readystatechange', function() {
                if (this.readyState === 4) {
                    console.log(this.responseText);
                }
            });

            xhr.open('POST', 'http://localhost:45105/api/users');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr.send(data);
        },
    },
});
</script>

<style lang="css" scoped></style>
