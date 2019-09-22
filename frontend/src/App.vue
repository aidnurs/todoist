<template>
    <div id="app">
        <Navbar />
        <div class="container">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from '@/components/Navbar.vue';
export default Vue.extend({
    components: { Navbar },
    mounted() {
        this.$store.dispatch('USER_REQUEST');
    },
});
</script>

<style lang="scss" src="@/assets/styles/style.scss"></style>
