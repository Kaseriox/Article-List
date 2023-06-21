import { describe, it, expect ,vi} from "vitest";
import { createLocalVue } from "@vue/test-utils";
import createWrapper from "../.mockFactory/mockFacktory";
import ArticleDetails from '../../src/components/Article/ArticleDetails.vue'
import Vuex from 'vuex'
import Buefy from 'buefy'

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
            mutations:{
                INCREASE(state)
                {
                    state.times += 1
                }
            },
            actions:{
                increase({commit})
                {
                    commit('INCREASE')
                }
            }
    }
}})

describe("ArticleDetails.vue", () => {

    let wrapper
    beforeEach(()=>{
        wrapper = createWrapper(ArticleDetails,{
            propsData:
                {
                    Article:{
                        title:"First Test",
                        author:"Testing Man",
                        content:"Testing testing ddddasdassd",
                        date:"6/14/2023, 6:29:00 PM",
                        id:9999
                    }
                },
                localVue,
                store
        })

    })
    it("Should Render Article Details Title Correctly", () => {
        const title = wrapper.get('[class="title"]')
        expect(title.text()).toBe('First Test')
    })

    it("Should Render Article Author Full Name Correctly",()=>{
        const author = wrapper.get('[class="subtitle is-6"]')
        expect(author.text()).toBe("Testing Man")
    })

    it("Should Render Article Content Correctly" ,()=>
    {
        const content = wrapper.get('[class="subtitle is-4"]')
        expect(content.text()).toBe("Testing testing ddddasdassd")
    })
    it("Go Back Button Should Call Function GoBack",()=>{
        const GoBackSpy = vi.spyOn(wrapper.vm,'GoBack')
        expect(GoBackSpy).toHaveBeenCalledTimes(0)
        wrapper.get('[class="button Go-Back"]').trigger('click')
        expect(GoBackSpy).toHaveBeenCalledTimes(1)
    })
    it("Go Back Function Should router.push",()=>{
            const Rspy = vi.spyOn(wrapper.vm.$router,'push')
            expect(Rspy).toHaveBeenCalledTimes(0)
            wrapper.get('[class="button Go-Back"]').trigger('click')
            expect(Rspy).toHaveBeenCalledTimes(1)
    })
    it("Should Trigger NotificationMessage Watcher",async ()=>{
        const Rspy = vi.spyOn(wrapper.vm.$router,'push')
        expect(Rspy).toHaveBeenCalledTimes(0)
        await store.dispatch('Notification/set_message',"Article Deleted Succesfully")
        await wrapper.vm.$nextTick()
        expect(Rspy).toHaveBeenCalledTimes(1)
        
    })
    it("Should Trigger Times Watcher",async ()=>{
        await store.dispatch('Refresh/increase')
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted().Reset.length).toBe(1)
        
        
    })
})