<template>
         <div  class="modal-card" style="width:auto">
			<header class="modal-card-head">
				<p class="modal-card-title>">Delete Form</p>
				
			</header>
			<section class="modal-card-body">
				<p class="title">Delete Article?</p>

			
			</section>

			<footer class="modal-card-foot">
				<b-button
                class="No-Button"
				label="Cancel"
				@click="HandleForm('No')" />
				<b-button 
                class="Yes-Button"
				label="Delete Article"
				type="is-primary"
				@click="HandleForm('Yes')"
				/>
			</footer>
	 	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';


	export default {
		name: "DeleteForm",
		components: { },
		data() {
        return {
        };
    },
	methods:{
        ...mapActions({
            Close:"Modal/close",
            set_message:"Notification/set_message"
        }),
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
        async DeleteArticle()
        {
            const response = await this.$DeleteArticle(this.id)
            if(response !== null)
            {
                this.set_message("Article Deleted Succesfully")
                this.Close()
            }
            else
            {
                this.set_message("Could Not Delete Article")
            }
        },
	},
    computed:{
        ...mapGetters({
            id:'Form/id'
        })
    }

	}
</script>