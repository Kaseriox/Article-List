<template>
    <div class="field">
        <label class="label">Search</label>
        <div class="control">
            <input class="input" type="text" placeholder="Search" @input="DebounceTest">
        </div>
    </div>
</template>
  
<script>
import debounce from 'debounce';

export default {
    name: "Search",
    components: {
    },
    data() {
        return {
        };
    },
    methods:{
        Search(value)
        {
            this.$store.dispatch('Search/search',value)
            this.$router.push('/page/1')
            this.ForceRerender()
        },
        ForceRerender()
        {
            this.$emit('ForceRerender')
        },
        DebounceTest:debounce(function(e)
        {
            this.Search(e.target.value)
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