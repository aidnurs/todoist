<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <ul>
            <li v-for="todo in this.todos">
                <p>
                    {{ todo.task }}
                </p>
                <!--<input type="checkbox" name="" value="" />-->
            </li>
        </ul>
        <input type="text" name="" value="" v-model="todo.task" @keyup.enter="addTodo" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import axios from 'axios';

export default Vue.extend({
    name: 'home',
    components: {},
    data() {
        return {
            todo: {
                task: '',
                status: false,
            },
            todos: [] as Object[],
        };
    },
    methods: {
        addTodo() {
            let test = JSON.stringify({
                task: this.todo.task,
                status: false,
            });
            console.log(typeof test);
            axios
                .post(
                    process.env.VUE_APP_BACKEND + '/api/todos',
                    {
                        task: this.todo.task,
                        status: false,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    },
                )
                .then(() => {
                    this.getTodos();
                });
        },
        getTodos() {
            axios
                .get(process.env.VUE_APP_BACKEND + '/api/todos')
                .then((res) => {
                    this.todos = res.data;
                })
                .catch((err) => {
                    throw err;
                });
        },
    },
    mounted() {
        this.getTodos();
    },
});
</script>
