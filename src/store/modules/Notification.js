


export default {
    namespaced:true,
    state:{
        message:undefined
        },
    getters:{
        message:(state)=>
        {
            return state.message
        }
    },
    mutations:{
        SET_MESSAGE(state,payload)
        {
            state.message = payload
        }
    },
    actions:{
        set_message({commit,dispatch},payload)
        {
            commit('SET_MESSAGE',payload)
            if(payload!==undefined)
            {
                dispatch('Refresh/increase',null,{root:true})
            }
        }
    }
}