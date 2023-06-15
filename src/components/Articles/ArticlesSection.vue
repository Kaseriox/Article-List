<template>
  <div v-if="Articles">
    <template v-for="Article in Articles">
        <ArticleCard :ArticleData="ArticleProp(Article)" v-on:Refresh="Refresh"></ArticleCard>
    </template>
  </div>
</template>

<script>
import ArticleCard from './ArticleCard.vue';
import {bus} from '../../main'
export default {
  name: "ArticlesSection",
  components: { ArticleCard },
  data() {
    return {
        Articles:undefined,
    };
  },
  methods: {
    Initialize() {
        this.GetArticleData()
    },
    async GetArticleData() {
      const response = await this.$GetArticles(`?_expand=author&_page=${this.$store.state.CurrentPage}${this.$store.state.SearchQuery === '' ? "" : `&q=${this.$store.state.SearchQuery} `}`)
      if (response.statusText === "OK") 
      {
        this.Articles = response.data;
        this.$store.dispatch('set_article_count',response.headers["x-total-count"])
        if(this.Articles.length === 0 && this.$store.state.SearchQuery === '')
        {
          bus.$emit('Notification','There Are No Articles')
        }

      } 
      else if(response === 404)
      {
        bus.$emit('Notification','Page Does Not Exist')
      }
      else
      {
        bus.$emit('Notification','Server Not Responding')
      }
    },
    ArticleProp(Prop)
    {
        const ArticleP = {
            id:Prop.id,
            title:Prop.title,
            author:Prop.author.name,
            date: Prop.created_at > Prop.updated_at ? Prop.created_at : Prop.updated_at 
        }
        return ArticleP
    },
    Refresh()
    {
      if(this.Articles.length === 1 && this.$store.state.CurrentPage != 1)
      {
            this.$store.dispatch('previous_page')
            this.$router.push(`/page/${this.$store.state.CurrentPage}`)
            
      }
      this.$emit('ForceRerender')
    }
  },
  created() {
    this.Initialize()
  },
};
</script>
