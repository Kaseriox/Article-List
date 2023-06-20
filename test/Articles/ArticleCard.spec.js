import { describe, it, expect } from "vitest";
import { beforeAll } from "vitest";
import createWrapper from '../../src/Template/mockFactory/mockFacktory';
import ArticleCard from '../../src/components/Articles/ArticleCard.vue'



describe("ArticleCard.vue", () => {

    let wrapper
    beforeAll(()=>{
        wrapper = createWrapper(ArticleCard,
            {propsData:
            {
                    ArticleData:{
                    id:5000,
                    title:"Title of all Time",
                    author:"Title Man",
                    date: "6/14/2023, 6:29:00 PM"
                }
            }})
    })
    it("Should Render Article Card Title Correctly", () => {
        const title = wrapper.get('[class="title"]')
        expect(title.text()).toBe('Title of all Time')
    })

    it("Should Render Article Card Author Correctly", ()=>
    {
        const author = wrapper.get('[class="subtitle"]')
        expect(author.text()).toBe('Title Man')
    })

    it("Should Render Article Card Date Correctly", ()=>
    {
        const date = wrapper.get('[class="subtitle is-6"]')
        expect(date.text()).toBe('6/14/2023, 6:29:00 PM')
    })

})