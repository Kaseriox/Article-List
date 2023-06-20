import { createLocalVue,mount} from '@vue/test-utils'
import Store from '../../store/store'
import Buefy from 'buefy'
import Vuex from 'vuex'
import API from '../../Plugins/API'
import VueRouter from "vue-router";





export function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item))
}


export function mergeDeep(target, ...sources) {
    if (!sources.length) return target
    const source = sources.shift()

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} })
                mergeDeep(target[key], source[key])
            } else {
                Object.assign(target, { [key]: source[key] })
            }
        }
    }

    return mergeDeep(target, ...sources)
}


function createWrapper(page, overrides) {



    const localVue = createLocalVue()

    localVue.use(VueRouter)
    localVue.use(Buefy)
    localVue.use(Vuex)
    localVue.use(API)
    const store = new Vuex.Store(Store)

    const defaultMountingOptions = {
        localVue,
        store,
        mocks: {
            $axios: {
                get: () => {
                    return new Promise(resolve => resolve({}))
                },
                put: () => Promise.resolve({}),
                post: () => Promise.resolve({}),
            },
            $router:
            {
                push:vi.fn()
            }
        },
        stubs: {
            "router-link":true
        },
        propsData: {},
        

    }
    return mount(
        page,
        mergeDeep(
            defaultMountingOptions,
            overrides
        )
    )
}

export default createWrapper



// createWrapper(MyComponent, {mocks: {
//     //your mocks goes here
// }})


