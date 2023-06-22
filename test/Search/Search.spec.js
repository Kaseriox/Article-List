import { describe, it, expect, beforeEach,vi } from "vitest";
import Search from '../../src/components/Search/Search.vue'
import { createLocalVue } from "@vue/test-utils";
import Buefy from 'buefy'
import Vuex from 'vuex'
import API from '../../src/Plugins/API'
import createWrapper from "../.mockFactory/mockFacktory";
const localVue = createLocalVue()

localVue.use(Buefy)
localVue.use(Vuex)
localVue.use(API)

describe("Search.vue", () => {
    vi.useFakeTimers()
    let wrapper
    let store
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
                        search:({commit},payload)=>
                        {
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
    
    it("Should Call Search Function Of Search Module On Input",async ()=>{
        const SearchSpy = vi.spyOn(wrapper.vm,'search')
        expect(SearchSpy).toHaveBeenCalledTimes(0)
        const input = await wrapper.find('[class="input"]')
        await input.setValue('Test')
        vi.advanceTimersByTime(1000)
        expect(SearchSpy).toHaveBeenCalledTimes(1)
        expect(SearchSpy).toBeCalledWith('Test')
    })

})