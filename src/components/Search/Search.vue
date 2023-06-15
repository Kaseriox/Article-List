<template>
    <div>
        <label>
            Search: 
            <input  @input="DebounceTest">
        </label>
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
            this.$store.dispatch('search',value)
            this.$router.push('/page/1')
            this.ForceRerender()
        },
        ForceRerender()
        {
            this.$emit('ForceRerender')
        },
        DebounceTest:debounce(function(e)
        {
            console.log(e.target.value)
            this.Search(e.target.value)
        },400)
    }
};
</script>