import { describe, it, expect } from "vitest";
import { createLocalVue,shallowMount } from "@vue/test-utils";
import Paging from '../../src/components/Articles/Paging.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)


describe("Paging.vue", () => {

    let wrapper
    let store
    beforeEach(()=>{
        store = new Vuex.Store({
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
                }
            }
        })
        wrapper = shallowMount(Paging,{
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
                stubs: {
                    'b-navbar':true,
                    'b-navbar-item':true,
                    'b-button':true,
                    'router-link':true,
                },
                localVue,
                store,
        })

    })


    it("Should Render Next Page Button Correctly", () => {
        const NextPage = wrapper.get('[class="Next-Page"]')
        expect(NextPage.text()).toBe('Next Page')
    })
    it("Should Render Previous Page Button Correctly", () => {
        const PreviousPage = wrapper.get('[class="Previous-Page"]')
        expect(PreviousPage.text()).toBe('Previous Page')
    })
    


})