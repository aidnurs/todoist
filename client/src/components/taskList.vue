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
        v-bind:index="index"
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
      todos: []
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
    deleteTodo() {
      $.ajax({
        url: 'http://localhost:8000/api/delete',
        type: 'DELETE',
        data: { input: this.newTask },
        success: function(result) {
          console.log(result);
        }
      });

    }
  },
  created(){
    Event.$on('remove',(todoText,index)=>{
      this.todos.splice(index, 1)
      $.ajax({
        url: 'http://localhost:8000/api/delete',
        type: 'DELETE',
        data: { input: todoText },
        success: function(result) {
          console.log(result);
        }
      });
    })
  }
};
</script>

<style lang="css">
  body{
    padding: 50px;
  }
</style>
