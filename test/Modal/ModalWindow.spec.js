import { describe, it, beforeEach, expect } from "vitest";
import ModalWindow from '../../src/components/Modal/ModalWindow.vue'
import createWrapper from "../.mockFactory/mockFacktory";
import CreateForm from "../../src/components/Form/CreateForm.vue"

describe("ModalWindow.vue", () => {

    let wrapper
    beforeEach(()=>{
        wrapper = createWrapper(ModalWindow)
        wrapper.vm.$store.state.Modal.Open = true
    })
    
    it("Should Not Render If Not Active",async ()=>{
        const ModalWindowDiv = wrapper.find('[class="modal-overlay"]')
        expect(ModalWindowDiv.isEmpty()).toBe(false)
        await wrapper.vm.$store.dispatch('Modal/close')
        await wrapper.vm.$nextTick()
        expect(ModalWindowDiv.isEmpty()).toBe(true)
    })

   
    it("Should Not Render If Not Active",async ()=>{
        expect(wrapper.vm.$store.state.Modal.Component).toBe(undefined)
        await wrapper.vm.$store.dispatch('Modal/set_component',CreateForm)
        expect(wrapper.vm.$store.state.Modal.Component).toBe(CreateForm)
        const CreateFormTitle = await wrapper.find("[class='modal-card-title']")
        expect(CreateFormTitle.text()).toBe('Create Form')
    })


})