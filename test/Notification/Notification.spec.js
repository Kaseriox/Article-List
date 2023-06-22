import { describe, it, expect, beforeEach } from "vitest";
import Notification from '../../src/components/Notification/Notification.vue'

import createWrapper from "../.mockFactory/mockFacktory";

describe("Notification.vue", () => {

    let wrapper
    beforeEach(()=>{
        wrapper = createWrapper(Notification)

    })
    
    it("Test Notification Message",async ()=>{
        expect(wrapper.text()).toContain('')
        await wrapper.vm.set_message('Testing')
        expect(wrapper.text()).toContain("Testing")
    })

   


})