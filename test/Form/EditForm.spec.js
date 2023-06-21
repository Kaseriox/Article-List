import { describe, it, expect, beforeEach,vi } from "vitest";
import EditForm from '../../src/components/Form/EditForm.vue'
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

    const GetArticleDataSpy = vi.spyOn(EditForm.methods,'GetArticleData')
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
        wrapper = createWrapper(EditForm,{
                localVue,
                store
        })

    })
    
    it("Should Call GetArticleData On Creation",()=>{
        expect(GetArticleDataSpy).toHaveBeenCalledTimes(1)
        expect(wrapper.vm.$data.ArticleData).toStrictEqual([
            {id:555,
            title:"testing this",
            author:{
                name:'tester'
            },
            created_at:"6/14/2023, 6:29:00 PM",
            updated_at:"6/14/2023, 6:29:00 PM"},
        ])
    })

    it("Should Correctly Close Form", ()=>{
        expect(store.state.Modal.Open).toBe(true)
        wrapper.find('[class="button Close-Button"]').trigger('click')
        expect(store.state.Modal.Open).toBe(false)
    })

    it("Notification Should Pop-Up Saying That Title Is Too Short", async ()=>{
        expect(store.state.Notification.message).toBe('')
        await wrapper.setData({ArticleData:{
            title:'',
            content:'',
            }})
        wrapper.find('[class="button is-primary"]').trigger('click')
        expect(store.state.Notification.message).toBe('Title Too Short')
        store.state.Notification.message = ''
    })
    
    it("Notification Should Pop-Up Saying That Content Is Too Short", async ()=>{
        expect(store.state.Notification.message).toBe('')
        await wrapper.setData({ArticleData:{
            title:'ssss',
            content:'',
            }})
        wrapper.find('[class="button is-primary"]').trigger('click')
        expect(store.state.Notification.message).toBe('Content Too Short')
        store.state.Notification.message = ''
    })

    it("Should Succesfully Edit An Article If All Fields Are Populated", async ()=>{
        expect(store.state.Notification.message).toBe('')
        await wrapper.setData({ArticleData:{
            title:'ssss',
            content:'sssss',
            }})
        wrapper.find('[class="button is-primary"]').trigger('click')
        expect(store.state.Notification.message).toBe('')
        store.state.Notification.message = ''
    })


})