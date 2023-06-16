<template>
    <div class="card" v-if="ArticleData">
            <div class="card-content">
                <router-link :to="'/article/' + ArticleData.id"><h1 class="title ">{{ ArticleData.title }}</h1></router-link>
                <h2 class="subtitle ">{{ ArticleData.author }}</h2>
                <h3 class="subtitle is-6">{{ ArticleData.date }}</h3>
            </div>
            <footer class="card-footer">
                <FormButton class='card-footer-item' :type="'Delete'" :id="ArticleData.id"></FormButton>
                <FormButton  class='card-footer-item' :type="'Edit'" :id="ArticleData.id" ></FormButton>
    
            </footer>
        
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


</style>