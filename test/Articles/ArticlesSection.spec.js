import { describe, it, expect, beforeEach,vi } from "vitest";
import { createLocalVue } from "@vue/test-utils";
import ArticlesSection from '../../src/components/Articles/ArticlesSection.vue'
import createWrapper from "../.mockFactory/mockFacktory";
import Vuex from 'vuex'
import Buefy from 'buefy'
describe("ArticlesSection.vue", () => {

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Buefy)


const store = new Vuex.Store({
    modules:{
    Notification:{
            namespaced:true,
            state:{
                message:''
            },
            getters:
            {
                message:(state)=>state.message
            },
            mutations:{
                SET_MESSAGE(state,payload)
                {
                    state.message = payload
                }
            },
            actions:{
                set_message({commit},payload)
                {
                    commit('SET_MESSAGE',payload)
                }
            }
        },
    Refresh:{
            namespaced:true,
            state:{
                times:0
            },
            getters:{
                times:(state)=>state.times
            },
        },
    Paging:{
            namespaced:true,
        state:{
            CurrentPage:1,
            ArticleCount:1,
        },
        getters:{
          CurrentPage: (state) =>{
            return state.CurrentPage
          },
          ArticleCount:(state)=>{
            return state.ArticleCount
          },
          TotalPages:(state)=>
          {
              return Math.ceil(state.ArticleCount / ARTICLES_PER_PAGE);
          },
        },
        mutations:{
            PREVIOUS_PAGE:(state)=>
            {
                if(state.CurrentPage != 1)
                {
                    state.CurrentPage = parseInt(state.CurrentPage) - parseInt(1) 
                }

            },
            NEXT_PAGE:(state)=>{
                state.CurrentPage = parseInt(state.CurrentPage) + parseInt(1)
            },
            SET_ARTICLE_COUNT:(state,payload)=>
            {
                state.ArticleCount = payload
            },
        },
        actions:{
            previous_page:({commit})=>
            {
                commit('PREVIOUS_PAGE')
            },
            next_page:({commit})=>{
                commit('NEXT_PAGE')
            },
            set_article_count:({commit},payload)=>
            {
                commit('SET_ARTICLE_COUNT',payload)
            }
        }   
        },
    Search:{
        namespaced:true,
        state:{
            SearchQuery:'',
            },
            getters:
            {
                SearchQuery:(state) =>
                {
                    return state.SearchQuery
                }
            },
    }
}})



    let wrapper
    let CreatedSpy
    beforeEach( ()=>{
        CreatedSpy = vi.spyOn(ArticlesSection.methods,'GetArticleData')
        wrapper = createWrapper(ArticlesSection)
  
    })
   
    it("Created Lifecycle Hook Should Call GetArticleData Method Correctly", ()=>{
        expect(CreatedSpy).toHaveBeenCalledTimes(1)
    })
    it("$GetArticles Plugin Should Be Called ",async ()=>
    {
        const GetArticlesSpy  = vi.spyOn(wrapper.vm,'$GetArticles')
        expect(GetArticlesSpy).toHaveBeenCalledTimes(0)
        await wrapper.vm.$GetArticles()
        expect(GetArticlesSpy).toHaveBeenCalledTimes(1)
    })
    it("CurrentPage Watcher Should Work Correctly ",async ()=>
    {
        console.log(store.state.Paging.CurrentPage)
        const GetArticlesDataSpy  = vi.spyOn(wrapper.vm,'GetArticleData')
        expect(GetArticlesDataSpy).toHaveBeenCalledTimes(0)
        await store.dispatch('Paging/next_page')
        await wrapper.vm.$nextTick()
        console.log(store.state.Paging.CurrentPage)
        expect(GetArticlesDataSpy).toHaveBeenCalledTimes(0)
    })
})