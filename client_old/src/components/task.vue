<template lang="html">
  <li>
    <input type="checkbox" v-model="done">
    <div v-if="show" v-on:dblclick="edit">
      {{title}}
    </div>
    <input v-if="showInput" v-model="str" v-on:keyup.enter="submit">
    <button v-on:click="remove">X</button>
  </li>
</template>

<script>
export default {
  props: ['title', 'index'],
  data() {
    return {
      doneClass:{
        fontSize:'50px'
      },
      done:false,
      str: this.title,
      show: true,
      showInput: false
    };
  },
  methods: {
    remove() {
      Event.$emit('remove', this.title, this.index);
    },
    edit() {
      this.show = false;
      this.showInput = true;
    },
    submit() {
      this.showInput = false;
      this.show = true;
      Event.$emit('submit', this.str,this.index);
      this.str = '';
    }
  }
};
</script>

<style lang="css">
  div{
    display: inline-block;
    white-space: nowrap;
  }
  button{

  }
</style>
