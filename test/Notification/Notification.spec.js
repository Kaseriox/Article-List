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

describe("CreateForm.vue", () => {

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
    
    it("Test Notification Message",()=>{
        expect(wrapper.text()).toContain('')
        store.state.Notification.message = "Testing Notification"
        expect(wrapper.text()).toContain('')
    })

   


})