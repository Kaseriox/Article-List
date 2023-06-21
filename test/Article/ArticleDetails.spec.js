import { describe, it, expect ,vi} from "vitest";

import createWrapper from "../../src/Template/mockFactory/mockFacktory";
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
        wrapper.get('[class="button Go-Back"]').trigger('click')
        expect(GoBackSpy).toHaveBeenCalledTimes(1)
    })
    it("Go Back Function Should router.push",()=>{
            const Rspy = vi.spyOn(wrapper.vm.$router,'push')
            wrapper.get('[class="button Go-Back"]').trigger('click')
            expect(Rspy).toHaveBeenCalledTimes(1)
    })
})