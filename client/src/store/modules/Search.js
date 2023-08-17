


export default {
    namespaced:true,
    state:{
        SearchQuery:'',
        },
        getters:
        {
            SearchQuery:(state) =>
            {
                return state.SearchQuery
            }
        },
    mutations:{
        SEARCH:(state,payload)=>
        {
            state.SearchQuery = payload
        },
    },
    actions:{
        search:({commit,dispatch},payload)=>
        {
            dispatch('Paging/reset_page',null,{root:true})
            commit('SEARCH',payload)
        },
    }
}