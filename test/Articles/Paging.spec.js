import { describe, it, expect,vi } from "vitest";
import { createLocalVue } from "@vue/test-utils";

import Paging from '../../src/components/Articles/Paging.vue'
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
                            CurrentPage:1,
                            ArticleCount:10,
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

describe("Paging.vue", () => {

    let wrapper

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
    it("Should Call previous_page Function When Next Page Button Is Pressed", async () => {
        const PreviousPageFunction = vi.spyOn(wrapper.vm,'previous_page')
         await wrapper.get('[class="button Previous-Page"]').trigger('click')
        expect(PreviousPageFunction).toHaveBeenCalledOnce()
    })
    it("Should Increment CurrentPage Number If Button Next Page Is Pressed",async ()=>
    {
        expect(store.state.Paging.CurrentPage).toBe(1)
        const NextPageButton = await wrapper.get('[class="button Next-Page"]')
        await NextPageButton.trigger('click')
        expect(store.state.Paging.CurrentPage).toBe(2)
    })
    it("Should Reduce CurrentPage Number If Button Previous Page Is Pressed",async ()=>
    {
        expect(store.state.Paging.CurrentPage).toBe(2)
        const PreviousPageButton = await wrapper.get('[class="button Previous-Page"]')
        await PreviousPageButton.trigger('click')
        expect(store.state.Paging.CurrentPage).toBe(1)
    })
    it("Previous Page Button Should Be Disabled If Current Page Is 1",async ()=>
    {
        expect(store.state.Paging.CurrentPage).toBe(1)
        const PreviousPageButton = await wrapper.get('[class="button Previous-Page"]')
        const NextPageButton = await wrapper.get('[class="button Next-Page"]')
        await PreviousPageButton.trigger('click')
        expect(store.state.Paging.CurrentPage).toBe(1)
        expect(PreviousPageButton.element.disabled).toBe(true)
        await NextPageButton.trigger('click')
        expect(store.state.Paging.CurrentPage).toBe(2)
        expect(PreviousPageButton.element.disabled).toBe(false)
    })
    it("Next Page Button Should Be Disabled If Current Page Is The Last Page",async ()=>
    {
        expect(store.state.Paging.CurrentPage).toBe(2)
        const PreviousPageButton = await wrapper.get('[class="button Previous-Page"]')
        const NextPageButton = await wrapper.get('[class="button Next-Page"]')
        await NextPageButton.trigger('click')
        expect(store.state.Paging.CurrentPage).toBe(3)
        await NextPageButton.trigger('click')
        expect(NextPageButton.element.disabled).toBe(true)
        expect(store.state.Paging.CurrentPage).toBe(4)
        await NextPageButton.trigger('click')
        expect(store.state.Paging.CurrentPage).toBe(4)
        await PreviousPageButton.trigger('click')
        expect(store.state.Paging.CurrentPage).toBe(3)
        expect(NextPageButton.element.disabled).toBe(false)
    })
})