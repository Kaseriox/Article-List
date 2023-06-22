import { describe, it, expect, beforeEach,vi} from "vitest";
import DeleteForm from '../../src/components/Form/DeleteForm.vue'
import createWrapper from "../.mockFactory/mockFacktory";

describe("Deleteform.vue", () => {

    let wrapper
    beforeEach(()=>{
        wrapper = createWrapper(DeleteForm)
        wrapper.vm.$store.state.Modal.Open = true

    })
    
    it("Should Close The Form Upon Pressing Cancel",async ()=>{
       expect(wrapper.vm.$store.state.Modal.Open).toBe(true)
       await wrapper.find('[class="button No-Button"]').trigger('click')
       expect(wrapper.vm.$store.state.Modal.Open).toBe(false)
    })

    it("Should Call DeleteArticle Function Upon Confirming Deletion",async()=>{
        const DeleteArticleSpy = vi.spyOn(wrapper.vm,'DeleteArticle')
        expect(DeleteArticleSpy).toHaveBeenCalledTimes(0)
        await wrapper.find('[class="button Yes-Button is-primary"]').trigger('click')
        expect(DeleteArticleSpy).toHaveBeenCalledTimes(1)
    })
    it("DeleteArticle Function Should Call $DeleteArticle Method",async ()=>{
        const spy = vi.spyOn(wrapper.vm,'$DeleteArticle')
        expect(spy).toHaveBeenCalledTimes(0)
        await wrapper.find('[class="button Yes-Button is-primary"]').trigger('click')
        expect(spy).toHaveBeenCalledTimes(1)
    })
    it("Should Display Message That Article Was Succesfully Delete",async ()=>{
        expect(wrapper.vm.$store.state.Notification.message).toBe(undefined)
        await wrapper.find('[class="button Yes-Button is-primary"]').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$store.state.Notification.message).toBe('Article Deleted Succesfully')
    }) 
    it("If Article Couldn't Be Deleted It Should Show Appropriate Message",async ()=>{

        
        wrapper = createWrapper(DeleteForm,{
            mocks:{
                $DeleteArticle()
                {
                    return null
                },
            }
        })
 
        expect(wrapper.vm.$store.state.Notification.message).toBe(undefined)
        await wrapper.find('[class="button Yes-Button is-primary"]').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$store.state.Notification.message).toBe('Could Not Delete Article')
    }) 
})