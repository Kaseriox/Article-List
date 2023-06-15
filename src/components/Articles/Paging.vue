<template>
    <div>
        <button @click="PreviousPage" :disabled="this.$store.state.CurrentPage == 1">Previous Page</button>
        <h2>{{ this.$store.state.CurrentPage}}</h2>
        <button @click="NextPage" :disabled="this.$store.state.CurrentPage== TotalPages">Next Page</button>
    </div>
</template>
  
<script>
export default {
    name: "Paging",
    components: {
    },
    data() {
        return {
        };
    },
    methods:{
        PreviousPage()
        {
            this.$store.dispatch('previous_page')
            this.$emit('ForceRerender')
        },
        NextPage()
        {
            this.$store.dispatch('next_page')
            this.$emit('ForceRerender')
        },
    },
    computed:{
        TotalPages()
        {
            return Math.ceil(this.$store.state.ArticleCount / 10);
        }
    },
};
</script>