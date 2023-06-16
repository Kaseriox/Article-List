
export default {
    namespaced:true,
    state:{
        CurrentPage:1,
        ArticleCount:1,
        },
    mutations:{
        RESET_PAGE:(state)=>
        {
            state.CurrentPage = 1
        },
        NEXT_PAGE:(state)=>
        {
            state.CurrentPage = parseInt(state.CurrentPage) + parseInt(1)
        },
        PREVIOUS_PAGE:(state)=>
        {
            if(state.CurrentPage != 1)
            {
                state.CurrentPage = parseInt(state.CurrentPage) - parseInt(1) 
            }
            
        },
        SET_ARTICLE_COUNT:(state,payload)=>
        {
            state.ArticleCount = payload
        },
        SET_PAGE:(state,payload)=>
        {
            state.CurrentPage = payload
        },
    },
    actions:{
        set_page:(context,payload)=>
        {
            context.commit('SET_PAGE',payload)
        },
        reset_page:(context)=>
        {
            context.commit('RESET_PAGE')
        },
        next_page:(context)=>
        {
            context.commit('NEXT_PAGE')
        },
        previous_page:(context)=>
        {
            context.commit('PREVIOUS_PAGE')
        },
        set_article_count:(context,payload)=>
        {
            context.commit('SET_ARTICLE_COUNT',payload)
        }
    }
}