<template lang="html">
  <div id="3">
    <ul>
      <li v-for="user in users" v-text="user.task"></li>
    </ul>
    <form method="post">
      <input v-model="users.task">
    </form>
    <button @click="addTask">add Task</button>
  </div>
</template>

<script>
var Vue = require('vue/dist/vue');
export default {
  data() {
    return {
      task: 'learn smth',
      users: []
    };
  },
  mounted: function() {
    var _this = this;
    /*$.getJSON('http://localhost:8000/api/get', function(data) {
      _this.users = data;
    });*/
    $.get('http://localhost:8000/api/get', function(data) {
      _this.users = data;
    });
  },
  methods: {
    addTask() {
      $.post(
        'http://localhost:8000/api/post',
        { input: this.users.task },
        function(data) {
          console.log(data);
        }
      );
    }
  }
};
</script>

<style lang="css">
</style>
