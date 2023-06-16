<template>
        <b-button @click="HandleClick()" >{{type}}</b-button>
</template>

<script>
import {bus} from '../../main'
export default {
    
  name: "Form",
  props:{
    type:{
        type:String,
        required:true
    },
    id:
    {
        type:Number,
        default:undefined
    }
  },
  data() {
        return {
        
        };
    },
  methods:{
    HandleClick()
    {
        bus.$emit('Clicked',{type:this.type,id:this.id })
    }
  },

};
</script>
<style>

</style>