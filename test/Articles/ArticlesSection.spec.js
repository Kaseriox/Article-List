import { describe, it, expect, beforeEach,vi } from "vitest";
import ArticlesSection from '../../src/components/Articles/ArticlesSection.vue'
import { mount, createLocalVue } from "@vue/test-utils";
import Buefy from 'buefy'
import Vuex from 'vuex'
import API from '../../src/Plugins/API'


const localVue = createLocalVue()

localVue.use(Buefy)
localVue.use(Vuex)
localVue.use(API)


describe("ArticlesSection.vue", () => {

    let wrapper
    let store
    let CreatedSpy
    beforeEach( ()=>{
        
        CreatedSpy = vi.spyOn(ArticlesSection.methods,'GetArticleData')
        store = new Vuex.Store({
            modules:{
                Paging:{
                    namespaced:true,
                    state:{
                        ArticleCount:1,
                        CurrentPage:1,
                    },
                    getters:{
                        CurrentPage:(state)=>state.CurrentPage,
                        ArticleCount:(state)=>state.ArticleCount,
                        TotalPages:()=>1
                    },
                    mutations:{
                        SET_ARTICLE_COUNT(state,payload)
                        {
                            state.ArticleCount = payload
                        }
                    },
                    actions:{
                            set_article_count({commit},payload){
                                commit('SET_ARTICLE_COUNT',payload)
                            },

                    },
                },
                Search:{
                    namespaced:true,
                    state:{
                        SearchQuery:'',
                    },
                    getters:
                    {
                        SearchQuery:(state)=>state.SearchQuery
                    },
                },
                Refresh:{
                    namespaced:true,
                    state:{
                        times:0
                    },
                    getters:{
                        times:(state)=>state.times
                    }
                }
            },
            mocks:{
                $GetArticles() {
                        return new Promise(resolve => resolve({
                            data:[
                                {id:555,
                                title:"testing this",
                                author:{
                                    name:'tester'
                                },
                                created_at:"6/14/2023, 6:29:00 PM",
                                updated_at:"6/14/2023, 6:29:00 PM"},
                            ],
                            headers:{
                                "x-total-count":1
                            }
                    }))
                },
            }
        })
        wrapper =  mount(ArticlesSection,{
                localVue,
                store,
        })
  
    })
   
    it("Created Lifecycle Hook Should Call GetArticleData Method Correctly", ()=>{
        expect(CreatedSpy).toHaveBeenCalledOnce()
    })
    it("Should ",()=>
    {
        console.log(wrapper.vm.$data.Articles)
    })
   
})