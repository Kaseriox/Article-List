<template>
    <div>
        404 Page
    </div>
</template>
  
  <script>
import { mapActions } from 'vuex';

  export default {
    name: "PageNotFoundView",
    components:{
        
    },
    data() {
      return {
        
      };
    },
    methods:{
      ...mapActions({
        set_message:"Notification/set_message",
      }),
    },
    created()
    {
      this.set_message('404 Page Not Found')
    }
  };
  </script>