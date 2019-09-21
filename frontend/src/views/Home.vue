<template>
    <div class="home">
        <ul>
            <li>
                <input type="checkbox" name="" value="" />
                <span>
                    task1
                </span>
            </li>
            <hr />
            <li>
                <input type="checkbox" name="" value="" />
                <span>
                    task1
                </span>
            </li>
            <hr />
        </ul>
        <ul>
            <li v-for="todo in this.todos">
                <p>
                    {{ todo.task }}
                </p>
            </li>
        </ul>

        <input
            type="text"
            name=""
            value=""
            v-model="todo.task"
            @keyup.enter="addTodo"
            placeholder="add todo"
        />
        <br />
        <br />
        <br />
        <br />
        <div class="">
            <button type="button" name="button" @click="deleteAllTodos">delete all</button>
        </div>
        <!-- <login></login> -->
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
var querystring = require('querystring');
import Login from '@/views/Login.vue';

export default Vue.extend({
    name: 'home',
    components: { Login },
    data() {
        return {
            todo: {
                task: '',
                status: false,
            },
            // TODO: create typescript Todo class
            todos: [] as Object[],
        };
    },
    methods: {
        addTodo() {
            const todoToSend = querystring.stringify({
                task: this.todo.task,
                status: false,
            });
            axios
                .post(process.env.VUE_APP_BACKEND + '/api/todos', todoToSend, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: localStorage.getItem('todoist-token') as string,
                    },
                })
                .then(() => {
                    this.getTodos();
                });
        },
        getTodos() {
            if (this.$store.getters.isAuthenticated) {
                axios
                    .get(process.env.VUE_APP_BACKEND + '/api/todos', {
                        headers: {
                            Authorization: localStorage.getItem('todoist-token') as string,
                        },
                    })
                    .then((resp) => {
                        this.todos = resp.data;
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        },
        deleteAllTodos() {
            axios.delete(process.env.VUE_APP_BACKEND + '/api/todos').then(() => {
                this.getTodos();
            });
        },
    },
    mounted() {
        this.getTodos();
    },
});
</script>
