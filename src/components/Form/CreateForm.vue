<template>
		<div  class="modal-card" style="width:auto">
			<header class="modal-card-head">
				<p class="modal-card-title>">Create Form</p>
				
			</header>
			<section class="modal-card-body">
				<b-field label="Title">
					<b-input
					type="text"
					v-model="FormInput.title"
					placeholder="Your Title"
					/>
				</b-field>
				<b-field>
					<b-select placeholder="Author" icon="account" v-model="FormInput.authorId">
  						<option v-for="Author in Authors" :value="Author.id">
							{{ Author.name }}
  						</option>
					</b-select>
				</b-field>

				<b-field label="Content">
           			 <b-input type="textarea" v-model="FormInput.content"></b-input>
       			</b-field>
			</section>

			<footer class="modal-card-foot">
				<b-button
				class="Close-Button"
				label="Close"
				@click="Close" />
				<b-button 
				class="Submit-Button"
				label="Create Article"
				type="is-primary"
				@click="HandleForm"
				/>
			</footer>
	 	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
		name: "CreateForm",
		components: {} ,
		data() {
        return {
			FormInput:{
				title:'',
				authorId:undefined,
				content:'',
			},
			Authors:undefined
        };
    },
	methods:{
		...mapActions({
			set_message:'Notification/set_message',
			Close:'Modal/close'
		}),
		async GetAuthors()
		{
			const response = await this.$GetAuthors()
			if(response!==null)
			{
				this.Authors = response.data
			}
			else
			{
				this.set_message("Could Not Get Authors")
			}
		},
		async HandleForm()
		{
			if(this.ValidateForm() === true)
			{
				const response = await this.$CreateArticle(this.FormInput)
				if(response !== null)
				{
					this.set_message("Article Created Succesfully")
					this.FormInput={
						title:'',
						authorId:undefined,
						content:''
					}
					this.Close()
				}
				else
				{
					this.set_message("Could Not Create Article")
				}
			}
		},
		ValidateForm()
		{
			if (this.FormInput.title.length < 2)
			{
        		this.set_message("Title Too Short")
        		return false;
      		}
      		if (this.FormInput.authorId === undefined)
			{
        		this.set_message("Select An Author")
        		return false;
      		}
      		if (this.FormInput.content.length < 2)
			{
        		this.set_message("Content Too Short")
        		return false;
    		}
      		return true
		},

	},
	created(){
		this.GetAuthors()
	}
}
</script>

<style scoped>

</style>