import { describe, it, expect, beforeEach,vi } from "vitest";
import CreateForm from '../../src/components/Form/CreateForm.vue'
import { mount, createLocalVue } from "@vue/test-utils";
import Buefy from 'buefy'
import Vuex from 'vuex'
import API from '../../src/Plugins/API'
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
                Modal:{
                    namespaced:true,
                    state:{
                        Open:true
                    },
                    mutations:{
                        CLOSE:(state)=> state.Open = false
                    },
                    actions:{
                            close:({commit})=>commit('CLOSE')
                    },
                },
                Notification:{
                    namespaced:true,
                    state:{
                        message:''
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
                }
            }
        })
        wrapper = mount(CreateForm,{
                localVue,
                store,
        })

    })
   
    it("Should Render Correct Text On Button", ()=>{
        expect(store.state.Modal.Open).toBe(true)
        wrapper.find('[class="button Close-Button"]').trigger('click')
        expect(store.state.Modal.Open).toBe(false)
    })

    it("Should Validate Form When Trying To Create New Article", ()=>{
        const ValidationSpy = vi.spyOn(wrapper.vm,'ValidateForm')
        expect(store.state.Modal.Open).toBe(true)
        wrapper.find('[class="button Submit-Button is-primary"]').trigger('click')
        expect(ValidationSpy).toHaveBeenCalledOnce()
    })

    it("Notification Should Pop-Up Saying That Title Is Too Short", ()=>{
        expect(store.state.Notification.message).toBe('')
        wrapper.find('[class="button Submit-Button is-primary"]').trigger('click')
        expect(store.state.Notification.message).toBe('Title Too Short')
    })
    
    it("Notification Should Pop-Up Saying That Select An Author", ()=>{
        expect(store.state.Notification.message).toBe('')
        wrapper.find('[class="button Submit-Button is-primary"]').trigger('click')
        expect(store.state.Notification.message).toBe('Title Too Short')
    })
})