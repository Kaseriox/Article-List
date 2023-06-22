import { describe, it, expect,vi } from "vitest";
import SingleArticle from '../../src/views/SingleArticle.vue'
import createWrapper from "../.mockFactory/mockFacktory";


describe("SingleArticle.vue", () => {
    let wrapper
    let GetArticleSpy
    beforeEach(()=>{
        GetArticleSpy = vi.spyOn(SingleArticle.methods,'GetArticle')
        wrapper = createWrapper(SingleArticle)
    })


    it("Should Call GetArticle Function On Create", () => {
        expect(GetArticleSpy).toBeCalledTimes(1)
    })

    
   
    it("Should Call GetArticles Plugin Function When GetArticle Function Is Called",async () => {
        const PluginSpy = vi.spyOn(wrapper.vm,'$GetArticles')
        expect(PluginSpy).toBeCalledTimes(0)
        await wrapper.vm.GetArticle()
        expect(PluginSpy).toBeCalledTimes(1)
    })
   
    it("Should Populate Article Variable On GetArticle Function Call",async  () => {
        wrapper.vm.$data.Article = undefined
        expect(wrapper.vm.$data.Article).toBe(undefined)
        await wrapper.vm.GetArticle()
        expect(wrapper.vm.$data.Article).toBeTruthy()
    })

})