<template lang="html">
  <div>
    <task-list></task-list>
  </div>
</template>

<script>
import taskList from './components/taskList.vue';
export default {
  components: { taskList },
  data() {
    return {};
  }
};
</script>

<style lang="css">
html{
  background-color: #FFFB00;
  font-size: 20px;
}
</style>
