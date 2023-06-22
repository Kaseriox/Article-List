import { describe, it, expect, beforeEach,vi } from "vitest";
import Search from '../../src/components/Search/Search.vue'
import createWrapper from "../.mockFactory/mockFacktory";


describe("Search.vue", () => {
    vi.useFakeTimers()
    let wrapper
    beforeEach(()=>{
        wrapper = createWrapper(Search)

    })
    
    it("Should Call Search Function Of Search Module On Input",async ()=>{
        const SearchSpy = vi.spyOn(wrapper.vm,'search')
        expect(SearchSpy).toHaveBeenCalledTimes(0)
        const input = await wrapper.find('[class="input"]')
        await input.setValue('Test')
        vi.advanceTimersByTime(1000)
        expect(SearchSpy).toHaveBeenCalledTimes(1)
        expect(SearchSpy).toBeCalledWith('Test')
    })

})