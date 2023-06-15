<template>
	<ModalWindow :name="'Edit'">
			<div  v-if="ArticleData" class="Form-Box">
			<label>
				Title: <input v-model="ArticleData.title">
			</label>
		
			<label>
				Content: <textarea v-model="ArticleData.content"></textarea>
			</label>

			<button @click="HandleForm">Edit Article</button>
	 	</div>
	</ModalWindow>
</template>

<script>
import ModalWindow from '../Modal/ModalWindow.vue';
import {bus} from '../../main'

	export default {
		name: "EditForm",
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
			ArticleData:undefined
        };
    },
	methods:{
		Initialize()
		{
			this.GetArticleData()
		},
		async GetArticleData()
		{
			const response = await this.$GetArticles(`/${this.id}`)
			if(response.statusText ==='OK')
			{
				this.ArticleData = response.data
			}
			else
			{
				bus.$emit('Notification','Failed To Receive Article')
				this.Close()
			}
		},
		async HandleForm()
		{
			let response = await this.$UpdateArticle(this.id,{title:this.ArticleData.title,content:this.ArticleData.content})
			if(response.statusText==='OK')
			{
				response = await this.$UpdateAuthor(this.ArticleData.authorId)
				if(response.statusText==='OK')
				{
					bus.$emit('Notification','Succesfully Edited Article')
					this.Close()
				}
				else
				{
					bus.$emit('Notification','Failed To Update Author')
				}
			}
			else
			{
				bus.$emit('Notification','Failed To Edit Article')
			}
		},
		Close()
		{
			this.$store.dispatch('close','Edit')
		}
	},
	created()
	{
		this.Initialize()
	}
	}
</script>