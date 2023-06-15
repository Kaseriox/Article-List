<template>
    <div v-if="Article">
        <div>
            <h1>{{ Article.title }}</h1>
            <h2>{{ Article.author.name }}</h2>
            <p>{{ Article.content }}</p>
            <h3>{{ Article.date }} </h3>
        </div>
        <DeleteArticleButton :id="Article.id"></DeleteArticleButton>
        <FormButton :type="'Edit'" :id="Article.id"></FormButton>
    </div>
</template>
  
<script>
import DeleteArticleButton from '../Buttons/DeleteArticleButton.vue';
import FormButton from '../Buttons/FormButton.vue';
import DynamicForm from '../Form/DynamicForm.vue';


export default {
    name: "ArticleDetails",
    props:{
        Article:{
            type:Object,
            required:true
        }
    },
    components: {
    DeleteArticleButton,
    DynamicForm,
    FormButton
},
    data() {
        return {
        };
    },
    methods:{
        
    },
};
</script>