import { describe, it, expect ,vi} from "vitest";
import createWrapper from "../.mockFactory/mockFacktory";
import ArticleDetails from '../../src/components/Article/ArticleDetails.vue'



describe("ArticleDetails.vue", () => {

    let wrapper
    beforeEach(()=>{
        wrapper = createWrapper(ArticleDetails,{
            propsData:
                {
                    Article:{
                        title:"First Test",
                        author:"Testing Man",
                        content:"Testing testing ddddasdassd",
                        date:"6/14/2023, 6:29:00 PM",
                        id:9999
                    }
                },
        })

    })
    it("Should Render Article Details Title Correctly", () => {
        const title = wrapper.get('[class="title"]')
        expect(title.text()).toBe('First Test')
    })

    it("Should Render Article Author Full Name Correctly",()=>{
        const author = wrapper.get('[class="subtitle is-6"]')
        expect(author.text()).toBe("Testing Man")
    })

    it("Should Render Article Content Correctly" ,()=>
    {
        const content = wrapper.get('[class="subtitle is-4"]')
        expect(content.text()).toBe("Testing testing ddddasdassd")
    })
    it("Go Back Button Should Call Function GoBack",()=>{
        const GoBackSpy = vi.spyOn(wrapper.vm,'GoBack')
        expect(GoBackSpy).toHaveBeenCalledTimes(0)
        wrapper.get('[class="button Go-Back"]').trigger('click')
        expect(GoBackSpy).toHaveBeenCalledTimes(1)
    })
    it("Go Back Function Should router.push",()=>{
            const Rspy = vi.spyOn(wrapper.vm.$router,'push')
            expect(Rspy).toHaveBeenCalledTimes(0)
            wrapper.get('[class="button Go-Back"]').trigger('click')
            expect(Rspy).toHaveBeenCalledTimes(1)
    })
    it("Should Trigger NotificationMessage Watcher",async ()=>{
        const Rspy = vi.spyOn(wrapper.vm.$router,'push')
        expect(Rspy).toHaveBeenCalledTimes(0)
        await wrapper.vm.$store.dispatch('Notification/set_message',"Article Deleted Succesfully")
        await wrapper.vm.$nextTick()
        expect(Rspy).toHaveBeenCalledTimes(1)
        
    })
    it("Should Trigger Times Watcher",async ()=>{
        await wrapper.vm.$store.dispatch('Refresh/increase')
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted().Reset.length).toBe(1)
        expect(wrapper.emitted().Reset.length)
        
        
    })
    it("There Should Be No Article Details If Article Is Undefined",async ()=>{
        const ArticleDetails = await wrapper.find('[class="ArticleDetails"]')
        expect(ArticleDetails.isEmpty()).toBe(false)
        wrapper.vm._props.Article = undefined
        await wrapper.vm.$nextTick()
        expect(ArticleDetails.isEmpty()).toBe(true)
    })
})