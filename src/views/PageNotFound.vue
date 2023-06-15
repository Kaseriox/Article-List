<template>
    <div>
        404 Page
    </div>
</template>
  
  <script>
  import {bus} from '../main'
  export default {
    name: "PageNotFoundView",
    components:{
        
    },
    data() {
      return {
        
      };
    },
    mounted()
    {
      bus.$emit('Notification','Page Does Not Exist')
    }
  };
  </script>