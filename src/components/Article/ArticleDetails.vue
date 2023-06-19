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
                    <b-button @click="GoBack()">Go Back</b-button>
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

import { mapGetters } from 'vuex';
import FormButton from '../Buttons/FormButton.vue';

export default {
    name: "ArticleDetails",
    props:{
        Article:{
            type:Object,
            required:true
        }
    },
    components: {
    FormButton
},
    data() {
        return {
        };
    },
    methods:{
        GoBack()
        {
            this.$router.push(`/`)
        }
    },
    computed:{
        ...mapGetters({
            CurrentPage:'Paging/CurrentPage',
            NotificationMessage:'Notification/message',
            Times:'Refresh/times'
        })
    },
    watch:
    {
        NotificationMessage(NewMessage)
        {
            
            if(NewMessage==="Article Deleted Succesfully")
            {
                this.$router.push('/')
                return;
            }
        },
        Times()
        {
            this.$emit('Reset')
        }
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