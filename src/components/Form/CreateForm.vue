<template>
	<ModalWindow :name="'Create'">
		<div v-if="Authors" class="Form-Box">
			<label>
				Title: <input v-model="FormInput.title">
			</label>

			<label>
				Author
				<select v-model="FormInput.authorId">
  					<option v-for="Author in Authors" :value="Author.id">
						{{ Author.name }}
  					</option>
				</select>
			</label>
		
			<label>
				Content: <textarea v-model="FormInput.content"></textarea>
			</label>

			<button @click="HandleForm">Submit New Article</button>
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
				console.log(response)
				if(response.statusText === 'Created')
				{
					response = await this.$UpdateAuthor(this.FormInput.authorId)
					if(response.statusText==='OK')
					{
						bus.$emit('Notification','Succesfully Created Article')
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
			this.$store.dispatch('close','Create')
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