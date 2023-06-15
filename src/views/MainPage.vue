<template>
    <div>
        <button v-on:click="RedirectToArticlesPage">ArticlesPage</button>
    </div>
</template>
  
<script>
export default {
    name: "MainPageView",
    components: {
    },
    data() {
        return {
           
        };
    },
    methods:
    {
        RedirectToArticlesPage()
        {
            this.$router.push('/page/1')
        }
    },
};
</script>