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
import { mapActions } from 'vuex';


export default {
  components: {
    Notification,
    ModalWindow
  },
  methods:{
    ...mapActions({
      connect_socket:'Socket/connect_socket'
    })
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
  },
  async created()
  {
    await this.connect_socket()
  }
};
</script>

<style >
  
</style>