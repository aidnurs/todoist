<template>
    <div class="home">
        <h1>Welcome to Todoist App</h1>
        <p>
            here you can manage your life with daily todos
        </p>
        <blockquote class="blockquote text-center">
            <p class="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a
                ante.
            </p>
            <footer class="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
            </footer>
        </blockquote>

        <div class="" v-for="todo in this.todos">
            <input type="checkbox" name="" value="" />
            <span>
                {{ todo.task }}
            </span>
            <hr />
        </div>

        <form>
            <div class="form-group">
                <!-- <label for="formGroupExampleInput2">Add Todo</label> -->
                <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput2"
                    v-model="todo.task"
                    placeholder="add todo"
                    @keyup.enter="addTodo"
                />
            </div>
        </form>
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
                .then((resp) => {
                    this.getTodos();
                    this.todo.task = '';
                    this.todo.status = false;
                })
                .catch((err) => {
                    throw err;
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
