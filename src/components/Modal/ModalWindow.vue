<template>
    <div @click.self="Close" v-if="IsOpen" class="modal-overlay">
        <div class="modal-content">
            <button @click="Close">X</button>
            <slot :Close="Close"></slot>
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

            this.$store.dispatch('close',this.name)
        },
    },
    computed:{
        IsOpen()
        {
            return this.$store.getters.AllOpen.includes(this.name)
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
        background-color: rgba(0, 0, 0, 0.1);
	}
	.modal-content {
		background-color: #fff;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		padding: 20px;
		max-height: 80%;
		max-width: 300px;
		width: 100%;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.modal-content button {
		float: right;
	}
   

</style>