<template lang="html">
  <div id="todo-list-example">
    <input
      v-model="newTodoText"
      v-on:keyup.enter="addNewTodo"
      placeholder="Add a todo"
    >
    <ul>
      <li
        is="task"
        v-for="(todo, index) in todos"

        v-bind:title="todo.task"
        v-on:remove=""
      ></li>
    </ul>
  </div>
</template>

<script>
import task from './task.vue';
export default {
  components: { task },
  data() {
    return {
      newTodoText: '',
      todos: [],
      //nextTodoId: 4
    };
  },
  mounted: function() {
    var _this = this;
    $.get('http://localhost:8000/api/get', function(data) {
      _this.todos = data;
    });
  },
  methods: {
    addNewTodo() {
      this.todos.push({
        task: this.newTodoText
      });
      $.ajax({
        url: 'http://localhost:8000/api/post',
        type: 'POST',
        data: { input: this.newTodoText },
        success: function(result) {
          console.log(result);
        }
      });
      this.newTodoText = '';
    },
    addTask() {
      $.ajax({
        url: 'http://localhost:8000/api/post',
        type: 'POST',
        data: { input: this.newTodoText },
        success: function(result) {
          console.log(result);
        }
      });
      this.newTask = '';
    },
    deleteTask() {
      $.ajax({
        url: 'http://localhost:8000/api/delete',
        type: 'DELETE',
        data: { input: this.newTask },
        success: function(result) {
          console.log(result);
        }
      });
      this.newTask = '';
    }
  }
};
</script>

<style lang="css">
  body{
    padding: 50px;
  }
</style>
