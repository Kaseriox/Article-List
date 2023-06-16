<template>
	<ModalWindow :name="'Delete'">
         <div  class="modal-card" style="width:auto">
			<header class="modal-card-head">
				<p class="modal-card-title>">Delete Form</p>
				
			</header>
			<section class="modal-card-body">
				<p class="title">Delete Article?</p>

			
			</section>

			<footer class="modal-card-foot">
				<b-button
				label="Cancel"
				@click="HandleForm('No')" />
				<b-button 
				label="Delete Article"
				type="is-primary"
				@click="HandleForm('Yes')"
				/>
			</footer>
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
			this.$store.dispatch('Modal/close')
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