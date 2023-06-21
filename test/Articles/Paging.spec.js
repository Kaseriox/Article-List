import { describe, it, expect,vi } from "vitest";
import { createLocalVue,mount } from "@vue/test-utils";
import Store from "../../src/store/store";
import Paging from '../../src/components/Articles/Paging.vue'
import Vuex from 'vuex'
import Buefy from 'buefy'
import createWrapper from "../../src/Template/mockFactory/mockFacktory";
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Buefy)
describe("Paging.vue", () => {

    let wrapper
    const store = new Vuex.Store({
                modules:{
                    Notification:{
                        namespaced:true,
                        getters:
                        {
                            message:()=>''
                        }
                    },
                    Refresh:{
                        namespaced:true,
                        getters:{
                        times:()=>0  
                        }
                    },
                    Paging:{
                        namespaced:true,
                        state:{
                            CurrentPage:2,
                            TotalPages:5,
                        },
                        getters:{
                            CurrentPage:(state)=>state.CurrentPage,
                            TotalPages:(state)=>state.TotalPages
                        },
                        mutations:{
                            PREVIOUS_PAGE:(state)=>state.CurrentPage = parseInt(state.CurrentPage) - parseInt(1),
                            NEXT_PAGE:(state)=> state.CurrentPage = parseInt(state.CurrentPage) + parseInt(1),
                    },
                    actions:{
                        previous_page({commit})
                        {
                            commit('PREVIOUS_PAGE')
                        },
                        next_page({commit})
                        {
                            commit('NEXT_PAGE')
                        }
                    }
                }
            }})


    beforeEach(()=>{
        wrapper = createWrapper(Paging,{
            localVue,
            store
        })
    })


    it("Should Render Next Page Button Correctly", () => {
        const NextPage = wrapper.get('[class="button Next-Page"]')
        expect(NextPage.text()).toBe('Next Page')
    })
    it("Should Render Previous Page Button Correctly", () => {
        const PreviousPage = wrapper.get('[class="button Previous-Page"]')
        expect(PreviousPage.text()).toBe('Previous Page')
    })
    it("Should Call next_page Function When Next Page Button Is Pressed",  () => {
        const NextPageFunction = vi.spyOn(wrapper.vm,'next_page')
         wrapper.get('[class="button Next-Page"]').trigger('click')
        expect(NextPageFunction).toHaveBeenCalledOnce()
    })
    it("Should Call previous_page Function When Next Page Button Is Pressed",  () => {
        const PreviousPageFunction = vi.spyOn(wrapper.vm,'previous_page')
         wrapper.get('[class="button Previous-Page"]').trigger('click')
        expect(PreviousPageFunction).toHaveBeenCalledOnce()
    })
    it("Should Increment CurrentPage Number If Button Next Page Is Pressed",()=>
    {
        expect(store.state.Paging.CurrentPage).toBe(2)
        const NextPageButton = wrapper.get('[class="button Next-Page"]')
        NextPageButton.trigger('click')
        expect(store.state.Paging.CurrentPage).toBe(3)
    })
    it("Should Reduce CurrentPage Number If Button Previous Page Is Pressed",()=>
    {
        expect(store.state.Paging.CurrentPage).toBe(3)
        const PreviousPageButton = wrapper.get('[class="button Previous-Page"]')
        PreviousPageButton.trigger('click')
    })


})