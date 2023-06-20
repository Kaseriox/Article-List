import { describe, it, expect, beforeEach,vi } from "vitest";
import CreateForm from '../../src/components/Form/CreateForm.vue'
import { mount, createLocalVue } from "@vue/test-utils";
import Buefy from 'buefy'
import Vuex from 'vuex'
import API from '../../src/Plugins/API'
const localVue = createLocalVue()

localVue.use(Buefy)
localVue.use(Vuex)
localVue.use(API)

describe("CreateForm.vue", () => {

    let wrapper
    let store
    beforeEach(()=>{
       
        store = new Vuex.Store({
            modules:{
                Modal:{
                    namespaced:true,
                    actions:{
                            close:vi.fn()
                    },
                },
                Form:{
                    namespaced:true,
                    actions:{
                        set_form:vi.fn()
                    }
                }
            }
        })
        wrapper = mount(CreateForm,{
                localVue,
                store,
        })

    })
   
    it("Should Render Correct Text On Button", ()=>{
        
    })

})