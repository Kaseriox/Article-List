
export default {
    namespaced:true,
    state:{
        CurrentPage:1,
        ArticleCount:1,
        },
        getters:{
          CurrentPage: (state) =>{
            
            return state.CurrentPage
          },
          ArticleCount:(state)=>{
            return state.ArticleCount
          },
          TotalPages:(state)=>
          {
              return Math.ceil(state.ArticleCount / ARTICLES_PER_PAGE);
          },
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
        set_page:({commit},payload)=>
        {
            commit('SET_PAGE',payload)
        },
        reset_page:({commit})=>
        {
            commit('RESET_PAGE')
        },
        next_page:({commit})=>
        {
            commit('NEXT_PAGE')
        },
        previous_page:({commit})=>
        {
            commit('PREVIOUS_PAGE')
        },
        set_article_count:({commit},payload)=>
        {
            commit('SET_ARTICLE_COUNT',payload)
        }
    }
}