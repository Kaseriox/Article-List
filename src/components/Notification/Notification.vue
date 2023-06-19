<template>
    <div v-if="message" class="Notification">
       <b-notification
            type="is-info"
            has-icon
            :closable="false"
            aria-close-label="Close notification"
            @click="set_message(undefined)">
            <p>{{ message }}</p>
            <i >Click To Close</i>
        </b-notification>
    </div>
    
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';


export default {
    name: "Notification",
    components: {
    },
    data() {
        return{}
    },
    methods:{
        ...mapActions({
            set_message:'Notification/set_message'
        })
    },
    computed:{
        ...mapGetters({
            message:'Notification/message'
        }),
    },

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