<template>
		<div  class="modal-card" style="width:auto">
			<header class="modal-card-head">
				<p class="modal-card-title">Create Form</p>
				
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
					<b-select placeholder="Author" icon="account" v-model="FormInput.authorID">
  						<option v-for="Author in Authors" :value="Author.id">
							{{ Author.name }} {{ Author.surname }}
  						</option>
					</b-select>
				</b-field>

				<b-field label="Content">
           			 <b-input type="textarea" v-model="FormInput.body"></b-input>
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
import { mapActions, mapGetters } from 'vuex';

export default {
		name: "CreateForm",
		components: {} ,
	data() {
			return {
				FormInput:{
					title:'',
					authorID:undefined,
					body:'',
				},
				Authors:undefined
			};
    	},
		computed:{
			...mapGetters({
				socket:'Socket/socket'
			})
		},
	methods:{
		...mapActions({
			set_message:'Notification/set_message',
			Close:'Modal/close'
		}),
		async GetAuthors()
		{
			const response = (await this.$GetAuthors()).data
			if(response!==null)
			{
				this.Authors = response.rows
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
				console.log(response)
				if(response !== null)
				{
					this.set_message("Article Created Succesfully")
					this.FormInput={
						title:'',
						authorID:undefined,
						body:''
					}
					this.socket.emit('Created Article')
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
      		if (this.FormInput.authorID === undefined)
			{
        		this.set_message("Select An Author")
        		return false;
      		}
      		if (this.FormInput.body.length < 2)
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