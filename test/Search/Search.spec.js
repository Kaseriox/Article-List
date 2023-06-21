import { describe, it, expect, beforeEach,vi } from "vitest";
import Search from '../../src/components/Search/Search.vue'
import { createLocalVue } from "@vue/test-utils";
import Buefy from 'buefy'
import Vuex from 'vuex'
import API from '../../src/Plugins/API'
import createWrapper from "../../src/Template/mockFactory/mockFacktory";
const localVue = createLocalVue()

localVue.use(Buefy)
localVue.use(Vuex)
localVue.use(API)

describe("CreateForm.vue", () => {

    let wrapper
    let store
    const SearchSpy = vi.spyOn(Search.methods,'Searching')
    beforeEach(()=>{
        store = new Vuex.Store({
            modules:{
                Search:{
                    namespaced:true,
                    state:{
                        Search:''
                    },
                    mutations:{
                        SEARCH:(state,payload)=>
                        {
                            state.SearchQuery = payload
                        },
                    },
                    actions:{
                        search:({commit,dispatch},payload)=>
                        {
                            dispatch('Paging/reset_page',null,{root:true})
                            commit('SEARCH',payload)
                        },
                    }
                }
            }
        })
        wrapper = createWrapper(Search,{
                localVue,
                store
        })

    })
    
    it("Should Call Function Searching On Input",async ()=>{
        expect(SearchSpy).toHaveBeenCalledTimes(0)
        const input = await wrapper.find('[class="input"]')
        await input.setValue('test')
        expect(SearchSpy).toHaveBeenCalledTimes(1)
        console.log(wrapper.vm.$store.state.Search.Search)


    })

   


})