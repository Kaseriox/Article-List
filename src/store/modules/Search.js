


export default {
    namespaced:true,
    state:{
        SearchQuery:'',
        },
    mutations:{
        SEARCH:(state,payload)=>
        {
            state.SearchQuery = payload
        },
    },
    actions:{
        search:(context,payload)=>
        {
            context.commit('RESET_PAGE')
            context.commit('SEARCH',payload)
        },
    }
}