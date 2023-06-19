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
                    <Paging></Paging>
                </b-navbar-item>
            </template>
        </b-navbar>
        <div>
            <Search ></Search>
            <ArticlesSection></ArticlesSection>
            
        </div>
    </div>

</template>
  
<script>
import ArticlesSection from '../components/Articles/ArticlesSection.vue';
import Paging from '../components/Articles/Paging.vue';
import FormButton from '../components/Buttons/FormButton.vue';
import Search from '../components/Search/Search.vue';


export default {
    name: "ArticlesPage",
    components: { ArticlesSection, Search, FormButton, Paging },
    data() {
        return {
        };
    },
    methods:
    {
    
    },
};
</script>

