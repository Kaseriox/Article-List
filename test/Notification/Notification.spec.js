import { describe, it, expect, beforeEach,vi } from "vitest";
import Notification from '../../src/components/Notification/Notification.vue'
import { createLocalVue } from "@vue/test-utils";
import Buefy from 'buefy'
import Vuex from 'vuex'
import API from '../../src/Plugins/API'
import createWrapper from "../.mockFactory/mockFacktory";
const localVue = createLocalVue()

localVue.use(Buefy)
localVue.use(Vuex)
localVue.use(API)

describe("Notification.vue", () => {

    let wrapper
    let store
    beforeEach(()=>{
        store = new Vuex.Store({
            modules:{
                Notification:{
                    namespaced:true,
                    state:{
                        message:''
                    },
                    getters:{
                        message:(state)=>
                        {
                            return state.message
                        }
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
            }
        })
        wrapper = createWrapper(Notification,{
                localVue,
                store
        })

    })
    
    it("Test Notification Message",async ()=>{
        expect(wrapper.text()).toContain('')
        await wrapper.vm.set_message('Testing')
        expect(wrapper.text()).toContain("Testing")
    })

   


})