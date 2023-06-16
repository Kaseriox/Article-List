<template>
	<ModalWindow :name="'Create'">
		<div v-if="Authors" class="modal-card" style="width:auto">
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
				label="Close"
				@click="Close" />
				<b-button 
				label="Create Article"
				type="is-primary"
				@click="HandleForm"
				/>
			</footer>
	 	</div>
	</ModalWindow>
</template>

<script>
import ModalWindow from '../Modal/ModalWindow.vue';
import {bus} from '../../main'


	export default {
		name: "CreateFormTest",
		components: { ModalWindow} ,
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
		Initialize()
		{
			this.GetAuthors()
		},
		async GetAuthors()
		{
			const response = await this.$GetAuthors()
			if(response.statusText==='OK')
			{
				this.Authors = response.data
			}
		},
		async HandleForm()
		{
			if(this.ValidateForm() === true)
			{
				let response = await this.$CreateArticle(this.FormInput)
				if(response.statusText === 'Created')
				{
					response = await this.$UpdateAuthor(this.FormInput.authorId)
					if(response.statusText==='OK')
					{
						bus.$emit('Notification','Succesfully Created Article')
						this.FormInput={
							title:'',
							authorId:undefined,
							content:''
						}
						this.Close()
					}
					else
					{
						bus.$emit('Notification','Failed To Update Author')
					}
					
				}
				else
				{
					bus.$emit('Notification','Failed To Create Article')
				}
			}
		},
		ValidateForm()
		{
			if (this.FormInput.title.length < 2)
			{
        		bus.$emit('Notification','Form Title Too Short')
        		return false;
      		}
      		if (this.FormInput.authorId === undefined)
			{
        		bus.$emit('Notification','Author Not Selected')
        		return false;
      		}
      		if (this.FormInput.content.length < 2)
			{
        		bus.$emit('Notification','Form Content Too Short')
        		return false;
      		}
      		return true
		},
		Close()
		{
			this.$store.dispatch('Modal/close')
		}

	},
	created()
	{
		this.Initialize()
	}
	}
</script>

<style scoped>
.Form-Box
{
	display: flex;
	flex-direction: column;
}

</style>