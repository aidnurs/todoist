<template lang="html">
  <div>
    <ul>
      <task v-for="todo in todos" v-text="todo.task"></task>
    </ul>
    <form method="post">
      <input v-model="todos.task">
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
      todos:[]
    };
  },
  mounted: function() {
    var _this = this;
    $.get('http://localhost:8000/api/get', function(data) {
      _this.todos = data;
    });
  },
  beforeMount(){
    console.log(111);
  },
  methods: {
    addTask() {
      $.ajax({
        url: 'http://localhost:8000/api/post',
        type: 'POST',
        data: { input: this.todos.task },
        success: function(result) {
          console.log(result);
        }
      });
    },
    deleteTask() {
      $.ajax({
        url: 'http://localhost:8000/api/delete',
        type: 'DELETE',
        data: { input: this.todos.task },
        success: function(result) {
          console.log(result);
        }
      });
    }
  }
};
</script>

<style lang="css">
</style>
