<template>
  <div class="columns is-multiline is-mobile" v-if="Articles">
    <div class="column is-one-quarter" v-for="Article in Articles" :key="Article.id">
        <ArticleCard :ArticleData="ArticleProp(Article)"></ArticleCard>
    </div>
  </div>
</template>

<script>
import ArticleCard from './ArticleCard.vue';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "ArticlesSection",
  components: { ArticleCard },
  data() {
    return {
        Articles:undefined,
    };
  },
  methods: { 
    ...mapActions({
        set_article_count:'Paging/set_article_count',
        previous_page:'Paging/previous_page',
        set_message:'Notification/set_message'
      }),

    async GetArticleData() {     
      const response = (await this.$GetArticles(`?expand=Author&limit=${ARTICLES_PER_PAGE}&page=${this.CurrentPage}`)).data
      if (response !== null) 
      {
        if(response.length === 0)
        {
          this.set_message('No New Articles')
          return
        }
        this.Articles = response.rows;
        this.set_article_count(response.TotalCount)
      } 
      else
      {
        this.set_message('Could Not Get Articles')
      }
    },
    ArticleProp(Prop)
    {
        const ArticleP = {
            id:Prop.id,
            title:Prop.title,
            author:Prop.Author.name + " " + Prop.Author.surname,
            date: Prop.createdAt > Prop.updatedAt  ? Prop.createdAt : Prop.updatedAt 
        }
        return ArticleP
    },
  },
  computed:{
    ...mapGetters({
      CurrentPage:'Paging/CurrentPage',
      Search:'Search/SearchQuery',
      ArticleCount:'Paging/ArticleCount',
      TotalPages:'Paging/TotalPages',
      NotificationMessage:'Notification/message',
      Times:'Refresh/times',
      socket:'Socket/socket'
    })
  },
  created() {
    this.GetArticleData()
  },
  watch:{
    CurrentPage()
    {
      this.GetArticleData()
    },
    Search()
    {
      this.GetArticleData()
    },
    ArticleCount()
    {
      if(this.CurrentPage > this.TotalPages)
      {
        this.previous_page()
      }
    },
    Times()
    {
      if(this.NotificationMessage !== 'Could Not Get Articles')
      {
          this.GetArticleData()
      }
    },
    socket()
    {
      this.socket.on('Refresh Articles',()=>{
        this.GetArticleData()
      })
    }
  }
};
</script>
