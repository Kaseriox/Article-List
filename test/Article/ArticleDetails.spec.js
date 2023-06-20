import { describe, it, expect ,vi} from "vitest";
import { createLocalVue } from "@vue/test-utils";
import createWrapper from "../../src/Template/mockFactory/mockFacktory";
import ArticleDetails from '../../src/components/Article/ArticleDetails.vue'
import VueRouter from "vue-router";

const localVue = createLocalVue()
localVue.use(VueRouter)


    const mockRoute = {
        path:'/',
        name:'test'
      }
      const router = new VueRouter({
        router:[mockRoute]
      })

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
                router
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

    it("Should Render Article Date Correctly",()=>
    {
        const date = wrapper.get('[class="subtitle"]')
        expect(date.text()).toBe("6/14/2023, 6:29:00 PM")
    })
    it("Go Back Button Should Call Function GoBack",()=>{

        const spy = vi.spyOn(wrapper.vm,'GoBack')
        wrapper.get('[class="button Go-Back"]').trigger('click')
        expect(spy).toHaveBeenCalledOnce()
    })
    it("Go Back Function Should router.push",()=>{
        
    })
})