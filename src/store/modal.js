import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        Open:[],
        SearchQuery:undefined,
        CurrentPage:1,
        ArticleCount:0
        },
    getters:{
        
        AllOpen:(state) => state.Open,
        Active:(state)=> state.Open.length > 0 ? true : false,

    },
    mutations:{
        OPEN:(state,payload)=>{
            state.Open.unshift(payload)
        },
        CLOSE:(state,payload)=>
        {
           state.Open =  state.Open.filter((filter) => filter !== payload)
        },
        SEARCH:(state,payload)=>
        {
            state.SearchQuery = payload
        },
        RESET_SEARCH:(state)=>
        {
            state.SearchQuery = undefined
        },
        SET_PAGE:(state,payload)=>
        {
            state.CurrentPage = payload
        },
        RESET_PAGE:(state)=>
        {
            state.CurrentPage = 1
        },
        NEXT_PAGE:(state)=>
        {
            state.CurrentPage = parseInt(state.CurrentPage) + parseInt(1)
        },
        PREVIOUS_PAGE:(state)=>
        {
            state.CurrentPage = parseInt(state.CurrentPage) - parseInt(1)
        },
        SET_ARTICLE_COUNT:(state,payload)=>
        {
            state.ArticleCount = payload
        }
    },
    actions:{
        open:(context,payload)=>{
            context.commit('OPEN',payload)
        },
        close:(context,payload)=>{
            context.commit('CLOSE',payload)
        },
        search:(context,payload)=>
        {
            context.commit('RESET_PAGE')
            context.commit('SEARCH',payload)
        },
        reset_search:(context)=>
        {
            context.commit('RESET_SEARCH')
        },
        set_page:(context,payload)=>
        {
            context.commit('SET_PAGE',payload)
        },
        reset_page:(context)=>
        {
            context.commit('RESET_PAGE')
        },
        next_page:(context)=>
        {
            context.commit('NEXT_PAGE')
        },
        previous_page:(context)=>
        {
            context.commit('PREVIOUS_PAGE')
        },
        set_article_count:(context,payload)=>
        {
            context.commit('SET_ARTICLE_COUNT',payload)
        }
    }
})