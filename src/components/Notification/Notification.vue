<template>
    <div v-if="message" class="Notification">
       
        <h1>{{message}}</h1>
         <p class="Close-Button" @click="SetMessage(undefined)">&times;</p>
    </div>
</template>
  
<script>
import { bus } from '../../main';

export default {
    name: "Notification",
    components: {
    },
    data() {
        return {
            message:undefined
        };
    },
    methods:
    {
        SetMessage(data)
        {
            this.message=data
        }
    },
    created()
    {
        
        bus.$on('Notification',(data)=>this.SetMessage(data))
    }
};
</script>
<style scoped>
.Notification {
    position: fixed;
    top: 20px;
    right: 10px;
  padding: 20px;
  background-color: #2196F3;
  color: white;
  margin: 0;
  max-width: 600px;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.Notification h1
{
    margin: 0;
    text-align: center;
}
.Close-Button
{
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 30px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
}
.Close-Button:hover{
    color: black;
}

</style>