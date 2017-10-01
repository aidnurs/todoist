<template lang="html">
  <li>
    {{title}}
    <button v-on:click="remove">X</button>
  </li>
</template>

<script>
export default {
  props: ['title','index'],
  methods: {
    remove() {
      Event.$emit('remove', this.title,this.index);
    }
  }
};
</script>

<style lang="css">

</style>
