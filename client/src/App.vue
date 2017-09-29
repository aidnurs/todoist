<template lang="html">
  <div class="">
    <div id="3">
      {{users}}
      <button @click="load">load</button>
    </div>
  </div>


</template>

<script>
export default {
  data(){
    return {
      task:'learn smth',
      users:[]
    }
  },
  methods: {
    load: function() {
      $.get('http://localhost:8000/api/get', function(data, status, request){
        if(status == 200)
        {
          this.users = data;
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
