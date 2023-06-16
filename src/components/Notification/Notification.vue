<template>
    <div v-if="message" class="Notification">
       <b-notification
            type="is-info"
            has-icon
            :closable="false"
            aria-close-label="Close notification"
            @click="SetMessage('')">
            <p>{{ message }}</p>
            <i >Click To Close</i>
        </b-notification>
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
    z-index:100;
    transition: 0.3s;
}
.Notification:hover{
    box-shadow: 5px 5px 5px rgba(68, 68, 68, 0.6);
}



</style>