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
      let response = (await this.$GetArticles(`/${this.id}?expand=Author`)).data;
      if (response !== null) 
      {
        this.Article = response;
        this.Article.createdAt = new Date(this.Article.createdAt).toLocaleString();
        this.Article.updatedAt = new Date(this.Article.updatedAt).toLocaleString();
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
            author:this.Article.Author.name + " " + this.Article.Author.surname,
            content:this.Article.body,
            date:this.Article.createdAt > this.Article.updatedAt ? this.Article.createdAt : this.Article.updatedAt
        }
    },
  },
  created() {
    this.GetArticle()
  },
};
</script>
