<template>
    <div v-if="Article">
        <b-navbar is-light >
            <template #start>
                <b-navbar-item tag="div">
                    <FormButton :type="'Delete'" :id="Article.id"></FormButton>
                    <FormButton :type="'Edit'" :id="Article.id"></FormButton>
                </b-navbar-item>
            </template>

            <template #end>
                <b-navbar-item>
                    <b-button @click="GoBack">Go Back</b-button>
                </b-navbar-item>
            </template>   
        </b-navbar>
        <div class="card">
            <div class="card-content">
                <p class="title">{{ Article.title }}</p>
                <p class="subtitle is-6">{{ Article.author }}</p>
                <p class="subtitle is-4">{{ Article.content }}</p>
                <p class="subtitle">{{ Article.date }} </p>
            </div>
        </div>
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
        GoBack()
        {
            this.$router.push(`/page/${this.$store.state.Paging.CurrentPage}`)
        }
    },
    created()
    {
        console.log(this.Article)
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
<style scoped>
.card{
    margin-top: 30px;
    
}
button
{
    margin: 5px;
}
</style>