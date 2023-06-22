import { describe, it, expect, beforeEach,vi } from "vitest";
import CreateForm from '../../src/components/Form/CreateForm.vue'
import createWrapper from "../.mockFactory/mockFacktory";


describe("CreateForm.vue", () => {

    let wrapper
    
    let GetAuthorsSpy
    beforeEach(()=>{
        GetAuthorsSpy = vi.spyOn(CreateForm.methods,'GetAuthors') 
        wrapper = createWrapper(CreateForm)
        wrapper.vm.$store.state.Modal.Open = true
    })
   
    it("Should Close Form Upon Pressing Close Button", async ()=>{
        expect(wrapper.vm.$store.state.Modal.Open).toBe(true)
        await wrapper.find('[class="button Close-Button"]').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$store.state.Modal.Open).toBe(false)
    })
    it("Should Call GetAuthors Function On Create",()=>
    {
        expect(GetAuthorsSpy).toHaveBeenCalledTimes(1)
        expect(wrapper.vm.$data.Authors).toBeTruthy()
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
        expect(wrapper.vm.$store.state.Modal.Open).toBe(true)
        await wrapper.find('[class="button Submit-Button is-primary"]').trigger('click')
        expect(ValidationSpy).toHaveBeenCalledTimes(1)
    })

    
    it("Notification Should Pop-Up Saying That Title Is Too Short", async ()=>{
        expect(wrapper.vm.$store.state.Notification.message).toBe(undefined)
        await wrapper.find('[class="button Submit-Button is-primary"]').trigger('click')
        expect(wrapper.vm.$store.state.Notification.message).toBe('Title Too Short')
    })
    
    it("Notification Should Pop-Up Saying That No Author Is Selected", async ()=>{
        expect(wrapper.vm.$store.state.Notification.message).toBe(undefined)
        await wrapper.setData({FormInput:{
            title:'ss',
            authorId:undefined,
            content:'',
            }})
        await wrapper.find('[class="button Submit-Button is-primary"]').trigger('click')
        expect(wrapper.vm.$store.state.Notification.message).toBe('Select An Author')
    })

    it("Notification Should Pop-Up Saying That Content Is Too Short",async ()=>
    {
        expect(wrapper.vm.$store.state.Notification.message).toBe(undefined)
        const input = wrapper.find('[class="input"]')
        await input.setValue('title')
        await wrapper.setData({FormInput:{
            title:'title',
            authorId:2,
            content:'',
            }})
        await wrapper.find('[class="button Submit-Button is-primary"]').trigger('click')
        expect(wrapper.vm.$store.state.Notification.message).toBe('Content Too Short')

    })

    it("Article Creation Form Should Work Correctly If All Required Data Is Inputted",async ()=>
    {
        const CreateArticleSpy = vi.spyOn(wrapper.vm,'$CreateArticle')
        expect(CreateArticleSpy).toHaveBeenCalledTimes(0)
        expect(wrapper.vm.$store.state.Notification.message).toBe(undefined)
        await wrapper.setData({FormInput:{
            title:'title',
            authorId:2,
            content:'testtt',
            }})
        await wrapper.find('[class="button Submit-Button is-primary"]').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$store.state.Notification.message).toBe("Article Created Succesfully")
        expect(CreateArticleSpy).toHaveBeenCalledTimes(1)
    })

    it("If Article Couldn't Be Created It Should Display Appropriate Message",async ()=>
    {
        wrapper = createWrapper(CreateForm,{
            mocks:{
                $CreateArticle()
                {
                    return null
                },
            }
    })
        const CreateArticleSpy = vi.spyOn(wrapper.vm,'$CreateArticle')
        expect(CreateArticleSpy).toHaveBeenCalledTimes(0)
        expect(wrapper.vm.$store.state.Notification.message).toBe(undefined)
        await wrapper.setData({FormInput:{
            title:'title',
            authorId:2,
            content:'testtt',
            }})
        await wrapper.find('[class="button Submit-Button is-primary"]').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$store.state.Notification.message).toBe("Could Not Create Article")
        expect(CreateArticleSpy).toHaveBeenCalledTimes(1)
    })


    it("If Authors Couldn't Be Received From Database It should Display Appropriate Message",async ()=>
    {
        
        wrapper = createWrapper(CreateForm,{
            mocks:{
                $GetAuthors()
                {
                    return null
                },
            }
        })
        expect(wrapper.vm.$store.state.Notification.message).toBe(undefined)
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$store.state.Notification.message).toBe('Could Not Get Authors')
    })
})