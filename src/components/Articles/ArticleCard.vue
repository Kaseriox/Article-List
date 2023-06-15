<template>
    <div class="Article-Card" v-if="ArticleData">
        <div class="Article-Card-Info">
            <router-link :to="'/article/' + ArticleData.id"><h1>{{ ArticleData.title }}</h1></router-link>
            <h2>{{ ArticleData.author }}</h2>
            <h3>{{ ArticleData.date }}</h3>
        </div>
    <FormButton :type="'Delete'" :id="ArticleData.id"></FormButton>
    <FormButton :type="'Edit'" :id="ArticleData.id" ></FormButton>
    </div>
</template>
  
<script>

import FormButton from '../Buttons/FormButton.vue';
import {bus} from '../../main'
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
        FormButton
},
    data() {
        return {
        };
    },
    methods:
    {
        Refresh()
        {
            this.$emit('Refresh')
        }
    },
    created()
    {
        this.ArticleData.date = new Date(this.ArticleData.date).toLocaleString()
        bus.$on('Notification',(data)=>
        {
            if(data==='Succesfully Deleted Article')
            {
                this.Refresh()
            }
        })
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