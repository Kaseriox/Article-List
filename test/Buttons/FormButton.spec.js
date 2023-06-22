//DONE???

import { describe, it, expect, beforeEach,vi } from "vitest";
import FormButton from '../../src/components/Buttons/FormButton.vue'
import { createLocalVue } from "@vue/test-utils";
import Buefy from 'buefy'
import Vuex from 'vuex'
import createWrapper from "../.mockFactory/mockFacktory";

const localVue = createLocalVue()

localVue.use(Buefy)
localVue.use(Vuex)

describe("FormButton.vue", () => {

    let wrapper
    let store
    beforeEach(()=>{
       
        store = new Vuex.Store({
            modules:{
                Modal:{
                    namespaced:true,
                    state:{
                        Open:false,
                        Component:undefined,
                    },
                    mutations:{
                        OPEN(state){
                            state.Open = true
                        },
                        SET_COMPONENT(state,payload)
                        {
                            state.Component = payload
                        }
                    },
                    actions:{
                            set_component({commit},payload)
                            {
                                commit('SET_COMPONENT',payload)
                            },
                            open({commit})
                            {
                                commit('OPEN')
                            },
                    },
                },
                Form:{
                    namespaced:true,
                    state:{
                        id:0
                    },
                    mutations:{
                        SET_FORM(state,payload)
                        {
                            state.id = payload
                        }
                    },
                    actions:{
                        set_form({commit},payload)
                        {
                            commit('SET_FORM',payload)
                        }
                    }
                }
            }
        })
        wrapper = createWrapper (FormButton,{
            propsData:{
                type:'Edit',
                id:5478,
                },
                localVue,
                store,
        })

    })
   
    it("Should Render Correct Text On Button", ()=>{
        const ButtonText = wrapper.find('button')
        expect(ButtonText.text()).toBe("Edit")
    })
    it("Should Pass Correct ID as a prop", ()=>
    {
        expect(wrapper.props().id).toBe(5478)
    })
    it("Button Click Should Call Function HandleClick",async()=>{
        const Bspy = vi.spyOn(wrapper.vm,'HandleClick')
        await wrapper.find('button').trigger('click')
        expect(Bspy).toHaveBeenCalledOnce()
    })
    it("Component Function Should Be Called Upon Pressing The Button",async ()=>
    {
        const Cspy = vi.spyOn(wrapper.vm,'Component')
        await wrapper.find('button').trigger('click')
        expect(Cspy).toHaveBeenCalledOnce()
    })
    it("Set_Component Action Of Module Modal Should Be Called After Button Click",async ()=>
    {
        const MSspy = vi.spyOn(wrapper.vm,'set_component')
        await wrapper.find('button').trigger('click')
        expect(MSspy).toHaveBeenCalledOnce()
    })
    it("Open Action Of Module Modal Should Be Called After Button Click",async ()=>
    {
        const Ospy = vi.spyOn(wrapper.vm,'open')
        await wrapper.find('button').trigger('click')
        expect(Ospy).toHaveBeenCalledOnce()
    })
    it("Open Action Of Module Modal Should Be Working",async ()=>
    {
        expect(store.state.Modal.Open).toBe(false)
        await wrapper.find('button').trigger('click')
        expect(store.state.Modal.Open).toBe(true)
    })
    it("Set_Component Action Of Module Modal Should Be Working When Type Is Edit",async ()=>
    {
        expect(store.state.Modal.Component).toBe(undefined)
        await wrapper.find('button').trigger('click')
        expect(store.state.Modal.Component.name).toBe('EditForm')
    })
    it("Set_Component Action Of Module Modal Should Be Working When Type Is Create",async ()=>
    {
        wrapper = createWrapper (FormButton,{
            propsData:{
                type:'Create',
                id:444,
                },
                localVue,
                store,
        })
        expect(store.state.Modal.Component).toBe(undefined)
        await wrapper.find('button').trigger('click')
        expect(store.state.Modal.Component.name).toBe('CreateForm')
    })
    it("Set_Component Action Of Module Modal Should Be Working When Type Is Delete",async ()=>
    {
        wrapper = createWrapper (FormButton,{
            propsData:{
                type:'Delete',
                id:44,
                },
                localVue,
                store,
        })
        expect(store.state.Modal.Component).toBe(undefined)
        await wrapper.find('button').trigger('click')
        expect(store.state.Modal.Component.name).toBe('DeleteForm')
    })

    it("Set_Form Action Of Module Form Should Be  Working",async ()=>
    {
        expect(store.state.Form.id).toBe(0)
        await wrapper.find('button').trigger('click')
        expect(store.state.Form.id).toBe(5478)
    })
})