<template>
    <div class="modal-overlay" v-if="IsOpen">
        <div class="modal-content">
            <slot></slot>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "ModalWindow",
    props:{
        name:{
            type:String,
            required:true,
        }
    },
    components: {
    },
    data() {
        return {
        };
    },
    methods:{
        Close()
        {

            this.$store.dispatch('Modal/close')
        },
    },
    computed:{
        IsOpen()
        {
            return this.$store.getters['Modal/Active']
        },
    },
    beforeDestroy(){
        if(this.IsOpen)
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