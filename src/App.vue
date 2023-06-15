<template>
  <div id="app">
    <router-view></router-view>
    <Notification></Notification>
    <DynamicForm></DynamicForm>
  </div>
</template>

<script>
import Notification from './components/Notification/Notification.vue';
import DynamicForm from './components/Form/DynamicForm.vue';



export default {
  components: {
    Notification,DynamicForm
},
  watch:{
    '$store.state.Open':function()
    {
      if(this.$store.getters.Active){
        document.documentElement.style.overflow = 'hidden'
        return
      }

      document.documentElement.style.overflow = 'auto'
    }
  }
};
</script>

<style >
  
</style>