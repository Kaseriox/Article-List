<template>
    <div class="buttons">
        <b-button @click="PreviousPage" :disabled="this.$store.state.Paging.CurrentPage <= 1 || this.$store.state.Paging.CurrentPage > TotalPages">Previous Page</b-button>
        <b-button @click="NextPage" :disabled="this.$store.state.Paging.CurrentPage >= TotalPages">Next Page</b-button>
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
            this.$store.dispatch('Paging/previous_page')
            this.$router.push(`/page/${this.$store.state.Paging.CurrentPage}`)
            this.$emit('ForceRerender')
        },
        NextPage()
        {
            this.$store.dispatch('Paging/next_page')
            this.$router.push(`/page/${this.$store.state.Paging.CurrentPage}`)
            this.$emit('ForceRerender')
        },
    },
    computed:{
        TotalPages()
        {
            return Math.ceil(this.$store.state.Paging.ArticleCount / 12);
        }
    },
};
</script>
