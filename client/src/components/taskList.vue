<template lang="html">
  <div>
    <task v-for="todo in todos" v-text="todo.task"></task>
    <form method="post">
      <input v-model="newTask">
    </form>
    <button @click="addTask">add Task</button>
    <button @click="deleteTask">delete Task</button>
  </div>
</template>

<script>
import task from './task.vue';
export default {
  components: { task },
  data() {
    return {
      newTask: '',
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
    addTask() {
      $.ajax({
        url: 'http://localhost:8000/api/post',
        type: 'POST',
        data: { input: this.newTask },
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
</style>
