import { describe, it, expect, beforeEach } from "vitest";
import Notification from '../../src/components/Notification/Notification.vue'

import createWrapper from "../.mockFactory/mockFacktory";

describe("Notification.vue", () => {

    let wrapper
    beforeEach(()=>{
        wrapper = createWrapper(Notification)
    })
    

    it("Should Not Render If There Is No Message",async()=>{
        let NotificationDiv = wrapper.find("[class='Notification']")
        expect(NotificationDiv.exists()).toBe(false)
        await wrapper.vm.$store.dispatch('Notification/set_message',"Testing Notification Component")
        await wrapper.vm.$nextTick()
        NotificationDiv = wrapper.find("[class='Notification']")
        expect(NotificationDiv.exists()).toBe(true)
    })

    it("Should Render Correct Message",async()=>{
        let MessageDiv = wrapper.find("[class='Message']")
        expect(MessageDiv.exists()).toBe(false)
        await wrapper.vm.$store.dispatch('Notification/set_message',"Testing Notification Component")
        await wrapper.vm.$nextTick()
        MessageDiv = wrapper.find("[class='Message']")
        expect(MessageDiv.exists()).toBe(true)
        expect(MessageDiv.text()).toBe("Testing Notification Component")
    })


})