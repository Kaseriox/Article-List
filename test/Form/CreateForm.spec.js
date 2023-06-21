import { describe, it, expect, beforeEach,vi } from "vitest";
import CreateForm from '../../src/components/Form/CreateForm.vue'
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
    let GetAuthorsSpy
    beforeEach(()=>{
        GetAuthorsSpy = vi.spyOn(CreateForm.methods,'GetAuthors')   
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
        wrapper = createWrapper(CreateForm,{
                localVue,
                store
        })

    })
   
    it("Should Correcly Close Form ", async ()=>{
        expect(store.state.Modal.Open).toBe(true)
        await wrapper.find('[class="button Close-Button"]').trigger('click')
        expect(store.state.Modal.Open).toBe(false)
    })
    it("Should Call GetAuthors Function On Create",()=>
    {
        expect(GetAuthorsSpy).toHaveBeenCalledTimes(1)
    })

    it("Should Fetch Authors Data Correctly",()=>{
        expect(wrapper.vm.$data.Authors).toStrictEqual([
            {
              "name": "David Roberts",
              "created_at": "2023-06-07T16:27:33.163Z",
              "id": 1,
              "updated_at": "2023-06-16T09:59:53.580Z"
            },
            {
              "name": "Emily Thompson",
              "created_at": "2023-06-07T16:29:58.331Z",
              "id": 2,
              "updated_at": "2023-06-16T10:09:14.458Z"
            },
        ])
    })


    it("Should Validate Form When Trying To Create New Article", async ()=>{
        const ValidationSpy = vi.spyOn(wrapper.vm,'ValidateForm')
        expect(ValidationSpy).toHaveBeenCalledTimes(0)
        expect(store.state.Modal.Open).toBe(true)
        await wrapper.find('[class="button Submit-Button is-primary"]').trigger('click')
        expect(ValidationSpy).toHaveBeenCalledTimes(1)
    })

    
    it("Notification Should Pop-Up Saying That Title Is Too Short", async ()=>{
        expect(store.state.Notification.message).toBe('')
        await wrapper.find('[class="button Submit-Button is-primary"]').trigger('click')
        expect(store.state.Notification.message).toBe('Title Too Short')
        store.state.Notification.message = ''
    })
    
    it("Notification Should Pop-Up Saying That No Author Is Selected", async ()=>{
        expect(store.state.Notification.message).toBe('')
        await wrapper.setData({FormInput:{
            title:'ss',
            authorId:undefined,
            content:'',
            }})
        await wrapper.find('[class="button Submit-Button is-primary"]').trigger('click')
        expect(store.state.Notification.message).toBe('Select An Author')
        store.state.Notification.message = ''
    })

    it("Notification Should Pop-Up Saying That Content Is Too Short",async ()=>
    {
        expect(store.state.Notification.message).toBe('')
        const input = wrapper.find('[class="input"]')
        await input.setValue('title')
        await wrapper.setData({FormInput:{
            title:'title',
            authorId:2,
            content:'',
            }})
        await wrapper.find('[class="button Submit-Button is-primary"]').trigger('click')
        expect(store.state.Notification.message).toBe('Content Too Short')
        store.state.Notification.message = ''

    })

    it("Article Creation Form Should Work Correctly If All Required Data Is Inputted",async ()=>
    {
        const CreateArticleSpy = vi.spyOn(wrapper.vm,'$CreateArticle')
        expect(CreateArticleSpy).toHaveBeenCalledTimes(0)
        expect(store.state.Notification.message).toBe('')
        await wrapper.setData({FormInput:{
            title:'title',
            authorId:2,
            content:'testtt',
            }})
        await wrapper.find('[class="button Submit-Button is-primary"]').trigger('click')
        await wrapper.vm.$nextTick()
        expect(store.state.Notification.message).toBe("Article Created Succesfully")
        expect(CreateArticleSpy).toHaveBeenCalledTimes(1)
        
        
    })

})