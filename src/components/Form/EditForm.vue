<template>
	<ModalWindow :name="'Edit'">
		 <div v-if="ArticleData" class="modal-card" style="width:auto">
			<header class="modal-card-head">
				<p class="modal-card-title>">Edit Form</p>
				
			</header>
			<section class="modal-card-body">
				<b-field label="Title">
					<b-input
					type="text"
					v-model="ArticleData.title"
					placeholder="Your Title"
					/>
				</b-field>

				<b-field label="Content">
           			 <b-input type="textarea" v-model="ArticleData.content"></b-input>
       			</b-field>
			</section>

			<footer class="modal-card-foot">
				<b-button
				label="Close"
				@click="Close" />
				<b-button 
				label="Edit Article"
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
			if(this.ValidateForm() ===true)
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
			}
		},
		ValidateForm()
		{
			if (this.ArticleData.title.length < 2)
			{
        		bus.$emit('Notification','Form Title Too Short')
        		return false;
      		}
      		if (this.ArticleData.authorId === undefined)
			{
        		bus.$emit('Notification','Author Not Selected')
        		return false;
      		}
      		if (this.ArticleData.content.length < 2)
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