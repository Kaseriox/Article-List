import { describe, it, expect, beforeEach,vi } from "vitest";
import ArticlesSection from '../../src/components/Articles/ArticlesSection.vue'
import createWrapper from "../.mockFactory/mockFacktory";

describe("ArticlesSection.vue", () => {

    let wrapper
    let CreatedSpy
    beforeEach( ()=>{
        CreatedSpy = vi.spyOn(ArticlesSection.methods,'GetArticleData')
        wrapper = createWrapper(ArticlesSection)
    })

   
    it("Created Lifecycle Hook Should Call GetArticleData Method ", ()=>{
        expect(CreatedSpy).toHaveBeenCalledTimes(1)
        expect(wrapper.vm.$data.Articles).toBeTruthy()
    })
    it("Articles Should Only Be Rendered If Articles Variable Is Populated",async ()=>{
        const ArticlesDiv = wrapper.get('[class="columns is-multiline is-mobile"]')
        expect(ArticlesDiv.isEmpty()).toBe(false)
        wrapper.vm.$data.Articles = undefined
        await wrapper.vm.$nextTick()
        expect(ArticlesDiv.isEmpty()).toBe(true)
    })
    it("$GetArticles Plugin Should Be Called ",async ()=>
    {
        const GetArticlesSpy  = vi.spyOn(wrapper.vm,'$GetArticles')
        expect(GetArticlesSpy).toHaveBeenCalledTimes(0)
        await wrapper.vm.$GetArticles()
        expect(GetArticlesSpy).toHaveBeenCalledTimes(1)
    })
    it("CurrentPage Watcher Should Work Correctly ",async ()=>
    {
        const GetArticlesDataSpy  = vi.spyOn(wrapper.vm,'GetArticleData')
        expect(GetArticlesDataSpy).toHaveBeenCalledTimes(0)
        await wrapper.vm.$store.dispatch('Paging/next_page')
        await wrapper.vm.$nextTick()
        expect(GetArticlesDataSpy).toHaveBeenCalledTimes(1)
    })

    it("Search Watcher Should Work Correctly ",async ()=>
    {
        const GetArticlesDataSpy  = vi.spyOn(wrapper.vm,'GetArticleData')
        expect(GetArticlesDataSpy).toHaveBeenCalledTimes(0)
        await wrapper.vm.$store.dispatch('Search/search', "test")
        await wrapper.vm.$nextTick()
        expect(GetArticlesDataSpy).toHaveBeenCalledTimes(1) 
    })

    it("Times Watcher Should Work Correctly ",async ()=>
    {
        const GetArticlesDataSpy  = vi.spyOn(wrapper.vm,'GetArticleData')
        expect(GetArticlesDataSpy).toHaveBeenCalledTimes(0)
        await wrapper.vm.$store.dispatch('Refresh/increase')
        await wrapper.vm.$nextTick()
        expect(GetArticlesDataSpy).toHaveBeenCalledTimes(1)
    })
})