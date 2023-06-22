import { describe, it, expect,vi } from "vitest";
import Paging from '../../src/components/Articles/Paging.vue'
import createWrapper from "../.mockFactory/mockFacktory";


describe("Paging.vue", () => {

    let wrapper

    beforeEach(()=>{
        wrapper = createWrapper(Paging)
    })


    it("Should Render Next Page Button Correctly", () => {
        const NextPage = wrapper.get('[class="button Next-Page"]')
        expect(NextPage.text()).toBe('Next Page')
    })
    it("Should Render Previous Page Button Correctly", () => {
        const PreviousPage = wrapper.get('[class="button Previous-Page"]')
        expect(PreviousPage.text()).toBe('Previous Page')
    })
    it("Should Call next_page Function When Next Page Button Is Pressed",async  () => {
        wrapper.vm.$store.state.Paging.ArticleCount = 10
        await wrapper.vm.$nextTick()
        const NextPageFunction = vi.spyOn(wrapper.vm,'next_page')
         wrapper.get('[class="button Next-Page"]').trigger('click')
        expect(NextPageFunction).toHaveBeenCalledOnce()
    })


    it("Should Call previous_page Function When Next Page Button Is Pressed", async () => {
        wrapper.vm.$store.state.Paging.ArticleCount = 10
        wrapper.vm.$store.state.Paging.CurrentPage = 3
        await wrapper.vm.$nextTick()
        const PreviousPageFunction = vi.spyOn(wrapper.vm,'previous_page')
        expect(PreviousPageFunction).toHaveBeenCalledTimes(0)
         await wrapper.get('[class="button Previous-Page"]').trigger('click')
         await wrapper.vm.$nextTick()
        expect(PreviousPageFunction).toHaveBeenCalledTimes(1)
    })


    it("Should Increment CurrentPage Number If Button Next Page Is Pressed",async ()=>
    {
        wrapper.vm.$store.state.Paging.ArticleCount = 10
        wrapper.vm.$store.state.Paging.CurrentPage = 1
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$store.state.Paging.CurrentPage).toBe(1)
        const NextPageButton = await wrapper.get('[class="button Next-Page"]')
        await NextPageButton.trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$store.state.Paging.CurrentPage).toBe(2)
    })
    it("Should Reduce CurrentPage Number If Button Previous Page Is Pressed",async ()=>
    {
        wrapper.vm.$store.state.Paging.ArticleCount = 10
        wrapper.vm.$store.state.Paging.CurrentPage = 2
        expect(wrapper.vm.$store.state.Paging.CurrentPage).toBe(2)
        const PreviousPageButton = await wrapper.get('[class="button Previous-Page"]')
        await PreviousPageButton.trigger('click')
        expect(wrapper.vm.$store.state.Paging.CurrentPage).toBe(1)
    })
    it("Previous Page Button Should Be Disabled If Current Page Is 1",async ()=>
    {
        wrapper.vm.$store.state.Paging.ArticleCount = 10
        expect(wrapper.vm.$store.state.Paging.CurrentPage).toBe(1)
        const PreviousPageButton = await wrapper.get('[class="button Previous-Page"]')
        const NextPageButton = await wrapper.get('[class="button Next-Page"]')
        await PreviousPageButton.trigger('click')
        expect(wrapper.vm.$store.state.Paging.CurrentPage).toBe(1)
        expect(PreviousPageButton.element.disabled).toBe(true)
        await NextPageButton.trigger('click')
        expect(wrapper.vm.$store.state.Paging.CurrentPage).toBe(2)
        expect(PreviousPageButton.element.disabled).toBe(false)
    })
    it("Next Page Button Should Be Disabled If Current Page Is The Last Page",async ()=>
    {
        wrapper.vm.$store.state.Paging.ArticleCount = 10
        wrapper.vm.$store.state.Paging.CurrentPage = 1
        expect(wrapper.vm.$store.state.Paging.CurrentPage).toBe(1)
        const PreviousPageButton = await wrapper.get('[class="button Previous-Page"]')
        const NextPageButton = await wrapper.get('[class="button Next-Page"]')
        await NextPageButton.trigger('click')
        await NextPageButton.trigger('click')
        await NextPageButton.trigger('click')
        expect(NextPageButton.element.disabled).toBe(true)
        expect(wrapper.vm.$store.state.Paging.CurrentPage).toBe(4)
        await NextPageButton.trigger('click')
        expect(wrapper.vm.$store.state.Paging.CurrentPage).toBe(4)
        await PreviousPageButton.trigger('click')
        expect(wrapper.vm.$store.state.Paging.CurrentPage).toBe(3)
        expect(NextPageButton.element.disabled).toBe(false)
    })
})