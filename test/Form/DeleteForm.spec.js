import { describe, it, expect, beforeEach,vi } from "vitest";
import DeleteForm from '../../src/components/Form/DeleteForm.vue'
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
                },
                Form:{
                    namespaced:true,
                    state:{
                        id:555,
                    },
                    getters:{
                        id:(state)=>state.id
                    }
                }
            }
        })
        wrapper = createWrapper(DeleteForm,{
                localVue,
                store
        })

    })
    
    it("Should Close The Form Upon Pressing ",async ()=>{
       expect(store.state.Modal.Open).toBe(true)
       await wrapper.find('[class="button No-Button"]').trigger('click')
       expect(store.state.Modal.Open).toBe(false)
    })

    it("Should Call DeleteArticle Function Upon Confirming Deletion",async()=>{
        const DeleteArticleSpy = vi.spyOn(wrapper.vm,'DeleteArticle')
        await wrapper.find('[class="button Yes-Button is-primary"]').trigger('click')
        expect(DeleteArticleSpy).toHaveBeenCalledTimes(1)
    })
    it("DeleteArticle Function Should Call $DeleteArticle Method",async ()=>{
        const spy = vi.spyOn(wrapper.vm,'$DeleteArticle')
        await wrapper.find('[class="button Yes-Button is-primary"]').trigger('click')
        expect(spy).toHaveBeenCalledTimes(1)
    })
      
})