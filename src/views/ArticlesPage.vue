<template>
    <div>
        <Search v-on:ForceRerender="ForceRerender" ></Search>
        <ArticlesSection :key="ComponentKey"></ArticlesSection>
        <Paging v-on:ForceRerender="ForceRerender"></Paging>
        <FormButton :type="'Create'"></FormButton>
    </div>
</template>
  
<script>
import ArticlesSection from '../components/Articles/ArticlesSection.vue';
import Paging from '../components/Articles/Paging.vue';
import FormButton from '../components/Buttons/FormButton.vue';
import DynamicForm from '../components/Form/DynamicForm.vue';
import Search from '../components/Search/Search.vue';



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
        this.$store.dispatch('set_page',this.CurrentPage)
    }
};
</script>

