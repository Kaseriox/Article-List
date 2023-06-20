import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import { describe, it, expect ,vi} from "vitest";
import Vuex from 'vuex'
import Buefy from 'buefy'
import ArticleDetails from '../../src/components/Article/ArticleDetails.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Buefy)



describe("ArticleDetails.vue", () => {
    const mockRoute = {
        params: {
          id: 1
        }
      }
      const mockRouter = {
        push: vi.fn()
      }
    let wrapper
    let store
    beforeEach(()=>{
        store = new Vuex.Store({
            modules:{
                Notification:{
                    namespaced:true,
                    getters:
                    {
                        message:()=>''
                    }
                },
                Refresh:{
                    namespaced:true,
                    getters:{
                      times:()=>0  
                    }
                }
            }
        })
        wrapper = mount(ArticleDetails,{
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
                mocks:{
                    $route: mockRoute,
                    $router: mockRouter
                },
                localVue,
                store,
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
    it("Go Back button should router.push",async ()=>{

        const spy = vi.spyOn(mockRouter,'push')
        await wrapper.find('#Go-Back-Button').trigger('click')
        expect(spy).toHaveBeenCalledTimes(1)
    })
})