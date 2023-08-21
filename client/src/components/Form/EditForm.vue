<template>
		 <div  class="modal-card" style="width:auto">
			<header class="modal-card-head">
				<p class="modal-card-title>">Edit Form</p>
				
			</header>
			<section class="Edit modal-card-body" v-if="ArticleData">
				<b-field label="Title">
					<b-input
					type="text"
					v-model="ArticleData.title"
					placeholder="Your Title"
					/>
				</b-field>

				<b-field label="Content">
           			 <b-input type="textarea" v-model="ArticleData.body"></b-input>
       			</b-field>
			</section>

			<footer class="modal-card-foot">
				<b-button
				class="Close-Button"
				label="Close"
				@click="Close" />
				<b-button 
				label="Edit Article"
				type="is-primary"
				@click="HandleForm"
				/>
			</footer>
	 	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	name: "EditForm",
	data() {
        return {
			ArticleData:undefined
        };
    },
	methods:{
		...mapActions({
			Close:'Modal/close',
			set_message:'Notification/set_message'
		}),
		async GetArticleData()
		{
			const response = await this.$GetArticles(`/${this.id}`)
			if(response !==null)
			{
				this.ArticleData = response.data
			}
			else
			{
				this.set_message("Could Not Get Article Data")
				this.Close()
			}
		},
		async HandleForm()
		{
			if(this.ValidateForm() ===true)
			{
				const response = await this.$UpdateArticle(this.id,{title:this.ArticleData.title,body:this.ArticleData.body})
				if(response!==null)
				{
					this.set_message("Succesfully Edited Article")
					this.socket.emit('Article Edited',{id:this.id})
					this.Close()
				}
				else
				{
					this.set_message("Failed To Update Article")
				}	
			}
		},
		ValidateForm()
		{
			if (this.ArticleData.title.length < 2)
			{
        		this.set_message("Title Too Short")
        		return false;
      		}
      		if (this.ArticleData.body.length < 2)
			{
        		this.set_message("Content Too Short")
        		return false;
      		}
      		return true
		},
	},
	computed:{
		...mapGetters({
			id:'Form/id',
			socket:'Socket/socket'
		})
	},
	created()
	{
		this.GetArticleData()
	},

}
</script>