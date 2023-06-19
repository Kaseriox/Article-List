<template>
  <div id="app">
    <router-view/>
    <Notification/>
    <ModalWindow/>
  </div>
</template>

<script>
import Notification from './components/Notification/Notification.vue';
import ModalWindow from './components/Modal/ModalWindow.vue';



export default {
  components: {
    Notification,
    ModalWindow
},
  watch:{
    '$store.state.Modal.Open':function()
    {
      if(this.$store.getters['Modal/Active']){
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