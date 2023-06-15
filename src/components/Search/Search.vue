<template>
    <div>
        <label>
            Search: 
            <input v-model="SearchQuery">
        </label>
        <button @click="Search" >Search</button>
        <button @click="Reset" v-if="this.$store.state.SearchQuery">Reset</button>
    </div>
</template>
  
<script>
export default {
    name: "Search",
    components: {
    },
    data() {
        return {
            SearchQuery:undefined
        };
    },
    methods:{
        Search()
        {
            this.$store.dispatch('search',this.SearchQuery)
            this.ForceRerender()
        },
        Reset()
        {
            this.$store.dispatch('reset_search')
            this.SearchQuery = undefined
            this.ForceRerender()
        },
        ForceRerender()
        {
            this.$emit('ForceRerender')
        }
    }
};
</script>