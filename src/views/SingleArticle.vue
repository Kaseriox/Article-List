<template>
  <div v-if="Article">
    <ArticleDetails :Article="ArticleProp()"></ArticleDetails>
  </div>
</template>

<script>
import ArticleDetails from '../components/Article/ArticleDetails.vue';
import {bus} from '../main'

export default {
  name: "SingleArticle",
  components: { ArticleDetails },
  data() {
    return {
      id: this.$route.params.id,
      Article: undefined,
    };
  },
  methods: {
    async GetArticle() 
    {
      let response = await this.$GetArticles(`/${this.id}?_expand=author`);
      if (response.statusText === "OK") 
      {
        this.Article = response.data;
        this.Article.created_at = new Date(this.Article.created_at).toLocaleString();
        this.Article.updated_at = new Date(this.Article.updated_at).toLocaleString();
      } 
      else if (response === 404) 
      {
        bus.$emit('Notification','Article Does Not Exist')
      } 
      else 
      {
        bus.$emit('Notification','Server Not Responding')
      }
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
