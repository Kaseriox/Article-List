import { describe, it, expect,vi } from "vitest";
import { createLocalVue } from "@vue/test-utils";

import SingleArticle from '../../src/views/SingleArticle.vue'
import Vuex from 'vuex'
import Buefy from 'buefy'
import createWrapper from "../.mockFactory/mockFacktory";
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
                set_message({commit,dispatch},payload)
                {
                    commit('SET_MESSAGE',payload)
                }
            }
        },
}})

describe("SingleArticle.vue", () => {
    const GetArticleSpy = vi.spyOn(SingleArticle.methods,'GetArticle')
    let wrapper

    beforeEach(()=>{
        
        wrapper = createWrapper(SingleArticle,{
            localVue,
            store
        })
    })


    it("Should Call GetArticle Function On Create", () => {
        expect(GetArticleSpy).toBeCalledTimes(1)
    })

    
   
    it("Should Call GetArticles Plugin Function When GetArticle Function Is Called",async () => {
        const PluginSpy = vi.spyOn(wrapper.vm,'$GetArticles')
        expect(PluginSpy).toBeCalledTimes(0)
        await wrapper.vm.GetArticle()
        expect(PluginSpy).toBeCalledTimes(1)
    })
   
    it("Should Populate Article Variable On GetArticle Function Call",async  () => {
        wrapper.vm.$data.Article = undefined
        expect(wrapper.vm.$data.Article).toBe(undefined)
        await wrapper.vm.GetArticle()
        expect(wrapper.vm.$data.Article).toBeTruthy()
    })

})