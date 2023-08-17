


export default {
    namespaced:true,
    state:{
        id:undefined
        },
    getters:{
        id:(state)=>
        {
            return state.id
        }
    },
    mutations:{
        SET_FORM(state,payload)
        {
            state.id = payload
        }
    },
    actions:{
        set_form({commit},payload)
        {
            commit('SET_FORM',payload)
        }
    }
}