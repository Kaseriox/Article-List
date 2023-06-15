<template>
	<ModalWindow :name="'Delete'">
		<div class="Form-Box">
            <h1>Are You Sure That You Want To Delete An Article?</h1>
			<button @click="HandleForm('Yes')">Yes</button>
            <button @click="HandleForm('No')">No</button>
	 	</div>
	</ModalWindow>
</template>

<script>
import ModalWindow from '../Modal/ModalWindow.vue';
import {bus} from '../../main'
	export default {
		name: "DeleteForm",
		props:
		{
			id:{
				type:Number,
				required:true
			}
		},
		components: { ModalWindow },
		data() {
        return {
        };
    },
	methods:{
        HandleForm(Response)
        {
            if(Response === 'No')
            {
                this.Close()
            }
            if(Response === 'Yes')
            {
                this.DeleteArticle()
            }
        },
		Close()
		{
			this.$store.dispatch('close','Delete')
		},
        async DeleteArticle()
        {
            const response = await this.$DeleteArticle(this.id)
            if(response.statusText === 'OK')
            {
                bus.$emit('Notification','Succesfully Deleted Article')
                this.Close()
            }
            else
            {
                bus.$emit('Notification','Failed To Delete Article')
            }
        },
	},

	}
</script>