<template lang="html">
    <div class="">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <router-link class="navbar-brand" to="/">Todoist</router-link>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <div class="navbar-nav mr-auto">
                        <div class="nav-item">
                            <router-link to="/" class="nav-link">Home</router-link>
                        </div>
                        <div class="nav-item">
                            <router-link to="/about" class="nav-link">About</router-link>
                        </div>
                    </div>
                    <div
                        class="navbar-nav ml-auto dropdown"
                        v-if="this.$store.getters.isAuthenticated"
                    >
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            User
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link class="dropdown-item" to="/">Action</router-link>
                            <router-link class="dropdown-item" to="/">Action</router-link>
                            <div class="dropdown-divider"></div>
                            <button
                                type="button"
                                name="button"
                                class="dropdown-item"
                                @click="logout"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                    <div class="navbar-nav ml-auto" v-else>
                        <router-link to="/login" class="nav-link">Login</router-link>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped></style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    methods: {
        logout() {
            this.$store.dispatch('AUTH_LOGOUT').then(() => {
                window.location.reload(true);
            });
        },
    },
});
</script>
