<template>
    <div class="buttons">
        <b-button class="Previous-Page" @click="PreviousPage" :disabled="CurrentPage <= 1 || CurrentPage > TotalPages">Previous Page</b-button>
        <b-button class="Next-Page" @click="NextPage" :disabled="CurrentPage >= TotalPages">Next Page</b-button>
    </div>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "Paging",
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
