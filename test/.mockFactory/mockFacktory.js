import { createLocalVue,mount} from '@vue/test-utils'

import Store from '../../src/store/store'
import Buefy from 'buefy'
import Vuex from 'vuex'
import API from '../../src/Plugins/API'

var _ = require('lodash')








function createWrapper(page, overrides) {


    const localVue = createLocalVue()
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
            $GetArticles() {
                return new Promise(resolve => resolve({
                    data:[
                        {id:555,
                        title:"testing this",
                        author:{
                            name:'tester'
                        },
                        created_at:"6/14/2023, 6:29:00 PM",
                        updated_at:"6/14/2023, 6:29:00 PM"},
                    ],
                    headers:{
                        "x-total-count":1
                    }
                }))
            },
            $GetAuthors()
            {
                return  new Promise(resolve=>resolve({
                    data:[
                        {
                          "name": "David Roberts",
                          "created_at": "2023-06-07T16:27:33.163Z",
                          "id": 1,
                          "updated_at": "2023-06-16T09:59:53.580Z"
                        },
                        {
                          "name": "Emily Thompson",
                          "created_at": "2023-06-07T16:29:58.331Z",
                          "id": 2,
                          "updated_at": "2023-06-16T10:09:14.458Z"
                        },
                    ]
                }))
         
            },
            $CreateArticle()
            {
                return  Promise.resolve({statusText:'Created'})
            },
            $DeleteArticle()
            {
                return Promise.resolve({statusText:'Deleted'})
            },
            $UpdateArticle()
            {
                return Promise.resolve({statusText:"Edited"})
            },
            $router:
            {
                push:()=>true
            },
        },
        stubs: {
            "router-link":true
        },
        propsData: {},
        

    }
    return mount(
        page,
        _.merge(defaultMountingOptions,overrides)
        
        
    )
}

export default createWrapper



// createWrapper(MyComponent, {mocks: {
//     //your mocks goes here
// }})


