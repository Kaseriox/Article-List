<template>
    <div class="field">
        <label class="label">Search</label>
        <div class="control">
            <input class="input" type="text" placeholder="Search" @input="Searching">
        </div>
    </div>
</template>
  
<script>
import debounce from 'debounce';
import { mapActions } from 'vuex';

export default {
    name: "Search",
    components: {
    },
    data() {
        return {
        };
    },
    methods:{
        ...mapActions({
            search:'Search/search'
        }),
        Searching:debounce(function(e)
        {
            this.search(e.target.value)
        },400)
    }
};
</script>
<style scoped>
    .field
    {
        margin: 20px;
    }
</style>