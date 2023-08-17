<template>
  <div v-if="Article">
    <ArticleDetails v-on:Reset="Reset" :Article="ArticleProp()" ></ArticleDetails>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ArticleDetails from '../components/Article/ArticleDetails.vue';

export default {
  name: "SingleArticle",
  components: { ArticleDetails },
  data() {
    return {
      id: this.$route.params.id ,
      Article: undefined,
    };
  },
  methods: {
    ...mapActions({
      set_message:'Notification/set_message'
    }),
    async GetArticle() 
    {
      let response = await this.$GetArticles(`/${this.id}?_expand=author`);
      if (response !== null) 
      {
        this.Article = response.data;
        this.Article.created_at = new Date(this.Article.created_at).toLocaleString();
        this.Article.updated_at = new Date(this.Article.updated_at).toLocaleString();
      } 
      else 
      {
        this.set_message("Could Not Get Article")
      }
    },
    Reset()
    {
      this.GetArticle()
    },
    ArticleProp()
    {
        return{
            id:this.Article.id,
            title:this.Article.title,
            author:this.Article.author.name,
            content:this.Article.content,
            date:this.Article.created_at > this.Article.updated_at ? this.Article.created_at : this.Article.updated_at
        }
    },
  },
  created() {
    this.GetArticle()
  },
};
</script>
