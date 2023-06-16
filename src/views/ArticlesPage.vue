<template>
    <div>
        <b-navbar is-light >
            <template #start>
                <b-navbar-item>
                    <FormButton :type="'Create'"></FormButton>
                </b-navbar-item>
            </template>

            <template #end>
                <b-navbar-item tag="div">
                    <Paging v-on:ForceRerender="ForceRerender"></Paging>
                </b-navbar-item>
            </template>
        </b-navbar>
        <div>
            <Search v-on:ForceRerender="ForceRerender" ></Search>
            <ArticlesSection :key="ComponentKey" v-on:ForceRerender="ForceRerender"></ArticlesSection>
            
        </div>
    </div>

</template>
  
<script>
import ArticlesSection from '../components/Articles/ArticlesSection.vue';
import Paging from '../components/Articles/Paging.vue';
import FormButton from '../components/Buttons/FormButton.vue';
import DynamicForm from '../components/Form/DynamicForm.vue';
import Search from '../components/Search/Search.vue';
import {bus} from '../main'


export default {
    name: "ArticlesPage",
    components: { ArticlesSection, Search, DynamicForm, FormButton, Paging },
    data() {
        return {
            CurrentPage:this.$route.params.page,
            ComponentKey:0
        };
    },
    methods:
    {
        ForceRerender()
        {
            this.ComponentKey += 1
        }
    },
    created()
    {
        this.$store.dispatch('Paging/set_page',this.CurrentPage)
        bus.$on('Notification',(data)=>
        {
            if(data==='Succesfully Created Article' || data==='Succesfully Edited Article')
            {
                this.ForceRerender()
            }
        })
    }
};
</script>

