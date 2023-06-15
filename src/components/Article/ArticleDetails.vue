<template>
    <div v-if="Article">
        <div>
            <h1>{{ Article.title }}</h1>
            <h2>{{ Article.author.name }}</h2>
            <p>{{ Article.content }}</p>
            <h3>{{ Article.date }} </h3>
        </div>
        <FormButton :type="'Delete'" :id="Article.id"></FormButton>
        <FormButton :type="'Edit'" :id="Article.id"></FormButton>
    </div>
</template>
  
<script>

import FormButton from '../Buttons/FormButton.vue';
import DynamicForm from '../Form/DynamicForm.vue';
import {bus} from '../../main'

export default {
    name: "ArticleDetails",
    props:{
        Article:{
            type:Object,
            required:true
        }
    },
    components: {
    DynamicForm,
    FormButton
},
    data() {
        return {
        };
    },
    methods:{
        PushToMainPage()
        {
            this.$router.push('/page/1')
        },
    },
    created()
    {
        bus.$on('Notification',(data)=>
        {
            if(data==='Succesfully Deleted Article')
            {
                this.PushToMainPage()
            }
        })
    }
};
</script>