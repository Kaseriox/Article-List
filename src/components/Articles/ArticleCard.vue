<template>
    <div class="Article-Card" v-if="ArticleData">
        <div class="Article-Card-Info">
            <router-link :to="'/article/' + ArticleData.id"><h1>{{ ArticleData.title }}</h1></router-link>
            <h2>{{ ArticleData.author }}</h2>
            <h3>{{ ArticleData.date }}</h3>
        </div>
    <DeleteArticleButton :id="ArticleData.id"></DeleteArticleButton>
    <FormButton :type="'Edit'" :id="ArticleData.id" ></FormButton>
    </div>
</template>
  
<script>
import DeleteArticleButton from '../Buttons/DeleteArticleButton.vue';
import FormButton from '../Buttons/FormButton.vue';

export default {
    name: "ArticleCard",
    props:{
        ArticleData:{
            type:Object,
            required:true,
            default: undefined
        }
    },
    components: {
    DeleteArticleButton,
    FormButton
},
    data() {
        return {
        };
    },
    created()
    {
        this.ArticleData.date = new Date(this.ArticleData.date).toLocaleString()
    }
};
</script>
<style scoped>
.Article-Card
{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
}
.Article-Card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
</style>