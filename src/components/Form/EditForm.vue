<template>
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

	export default {
		name: "EditForm",
		components: {},
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
				const response = await this.$UpdateArticle(this.id,{title:this.ArticleData.title,content:this.ArticleData.content})
				if(response!==null)
				{
					this.set_message("Succesfully Edited Article")
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
      		if (this.ArticleData.content.length < 2)
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
		})
	},
	created()
	{
		this.GetArticleData()
	},

}
</script>