import { describe, it, expect, beforeEach,vi } from "vitest";
import EditForm from '../../src/components/Form/EditForm.vue'
import createWrapper from "../.mockFactory/mockFacktory";


describe("EditForm.vue", () => {

    let GetArticleDataSpy
    let wrapper
    beforeEach(()=>{
        GetArticleDataSpy = vi.spyOn(EditForm.methods,'GetArticleData')
        wrapper = createWrapper(EditForm)
        wrapper.vm.$store.state.Modal.Open = true

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

    it("Should Close Form Upon Pressing Close Button",async ()=>{
        expect(wrapper.vm.$store.state.Modal.Open).toBe(true)
        await wrapper.find('[class="button Close-Button"]').trigger('click')
        expect(wrapper.vm.$store.state.Modal.Open).toBe(false)
    })

    it("Notification Should Pop-Up Saying That Title Is Too Short", async ()=>{
        expect(wrapper.vm.$store.state.Notification.message).toBe(undefined)
        await wrapper.setData({ArticleData:{
            title:'',
            content:'',
            }})
        await wrapper.find('[class="button is-primary"]').trigger('click')
        expect(wrapper.vm.$store.state.Notification.message).toBe('Title Too Short')

    })
    
    it("Notification Should Pop-Up Saying That Content Is Too Short", async ()=>{
        expect(wrapper.vm.$store.state.Notification.message).toBe(undefined)
        await wrapper.setData({ArticleData:{
            title:'ssss',
            content:'',
            }})
        await wrapper.find('[class="button is-primary"]').trigger('click')
        expect(wrapper.vm.$store.state.Notification.message).toBe('Content Too Short')
    })

    it("Should Succesfully Edit An Article If All Fields Are Populated", async ()=>{
        expect(wrapper.vm.$store.state.Notification.message).toBe(undefined)
        await wrapper.setData({ArticleData:{
            title:'ssss',
            content:'sssss',
            }})
        await wrapper.find('[class="button is-primary"]').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$store.state.Notification.message).toBe('Succesfully Edited Article')
    })

    it("If Article Couldn't Be Updated It Should Show Appropriate Message", async ()=>{

        wrapper = createWrapper(EditForm,{
            mocks:{
                $UpdateArticle()
                {
                    return null
                }
            }
        })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$store.state.Notification.message).toBe(undefined)
        await wrapper.setData({ArticleData:{
            title:'ssss',
            content:'ssss',
            }})
        await wrapper.find('[class="button is-primary"]').trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$store.state.Notification.message).toBe("Failed To Update Article")
    })


    it("If It Couldn't Retrieve Specific Article Data For Editing It should Display Appropriate Message", async ()=>{

        wrapper = createWrapper(EditForm,{
            mocks:{
                $GetArticles()
                {
                    return null
                }
            }
        })
        expect(wrapper.vm.$store.state.Notification.message).toBe(undefined)
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$store.state.Notification.message).toBe("Could Not Get Article Data")
    })


})