import { describe, it, expect, beforeEach,vi } from "vitest";
import ArticlesSection from '../../src/components/Articles/ArticlesSection.vue'
import createWrapper from "../../src/Template/mockFactory/mockFacktory";

describe("ArticlesSection.vue", () => {

    let wrapper
    let CreatedSpy
    beforeEach( ()=>{
        
        CreatedSpy = vi.spyOn(ArticlesSection.methods,'GetArticleData')
        wrapper = createWrapper(ArticlesSection)
  
    })
   
    it("Created Lifecycle Hook Should Call GetArticleData Method Correctly", ()=>{
        expect(CreatedSpy).toHaveBeenCalledTimes(1)
    })
    it("$GetArticles Plugin Should Return Some Data ",()=>
    {
        expect(wrapper.vm.$data.Articles).toBeTypeOf("object")
        //console.log(wrapper.vm.$data.Articles)
    })
   
})