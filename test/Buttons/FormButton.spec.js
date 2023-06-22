import { describe, it, expect, beforeEach,vi } from "vitest";
import FormButton from '../../src/components/Buttons/FormButton.vue'
import createWrapper from "../.mockFactory/mockFacktory";



describe("FormButton.vue", () => {

    let wrapper
    beforeEach(()=>{
        wrapper = createWrapper(FormButton,{
            propsData:{
                type:'Edit',
                id:5478,
                },
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
        expect(wrapper.vm.$store.state.Modal.Open).toBe(false)
        await wrapper.find('button').trigger('click')
        expect(wrapper.vm.$store.state.Modal.Open).toBe(true)
    })
    it("Set_Component Action Of Module Modal Should Be Working When Type Is Edit",async ()=>
    {
        expect(wrapper.vm.$store.state.Modal.Component).toBe(undefined)
        await wrapper.find('button').trigger('click')
        expect(wrapper.vm.$store.state.Modal.Component.name).toBe('EditForm')
    })
    it("Set_Component Action Of Module Modal Should Be Working When Type Is Create",async ()=>
    {
        wrapper = createWrapper (FormButton,{
            propsData:{
                type:'Create',
                id:444,
                },
        })
        expect(wrapper.vm.$store.state.Modal.Component).toBe(undefined)
        await wrapper.find('button').trigger('click')
        expect(wrapper.vm.$store.state.Modal.Component.name).toBe('CreateForm')
    })
    it("Set_Component Action Of Module Modal Should Be Working When Type Is Delete",async ()=>
    {
        wrapper = createWrapper (FormButton,{
            propsData:{
                type:'Delete',
                id:44,
                },
        })
        expect(wrapper.vm.$store.state.Modal.Component).toBe(undefined)
        await wrapper.find('button').trigger('click')
        expect(wrapper.vm.$store.state.Modal.Component.name).toBe('DeleteForm')
    })
})