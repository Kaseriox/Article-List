<template>
    <div class="modal-overlay" v-if="Active">
        <div class="modal-content">
            <component :is="Component"></component>
        </div>
    </div>
</template>
  
<script>
import { mapGetters,mapActions } from 'vuex';

export default {
    name: "ModalWindow",
    components: {
    },
    data() {
        return {
        };
    },
    methods:{
        ...mapActions({
            Close:'Modal/close',
        })
    },
    computed:{
        ...mapGetters({
            Active:'Modal/Active',
            Component:'Modal/Component'
        })
    },
    beforeDestroy(){
        if(this.Active)
        {
            this.Close()
        }
    }
};
</script>

<style scoped>
	.modal-overlay {
        position: fixed; 
        z-index: 1; 
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%; 
        background-color: rgba(0, 0, 0, 0.2);
	}
	.modal-content {
		background-color: #fff;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.modal-content button {
		float: right;
	}
   

</style>