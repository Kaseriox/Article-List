<template>
    <div class="buttons">
        <b-button @click="PreviousPage" :disabled="this.$store.state.Paging.CurrentPage <= 1 || this.$store.state.Paging.CurrentPage > TotalPages">Previous Page</b-button>
        <b-button @click="NextPage" :disabled="this.$store.state.Paging.CurrentPage >= TotalPages">Next Page</b-button>
    </div>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "Paging",
    components: {
    },
    data() {
        return {
        };
    },
    methods:{
        ...mapActions({
            previous_page:'Paging/previous_page',
            next_page:'Paging/next_page',

        }),
        PreviousPage()
        {
            this.previous_page()
        },
        NextPage()
        {
            this.next_page()
        },
    },
    computed:{

        ...mapGetters({
            TotalPages:'Paging/TotalPages',
            CurrentPage:'Paging/CurrentPage'
        }),
    },
};
</script>
