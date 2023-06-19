


export default {
    namespaced:true,
    state:{
        times:0
        },
    getters:{
        times:(state)=>
        {
            return state.times
        }
    },
    mutations:{
        INCREASE(state)
        {
            state.times += 1
        }
    },
    actions:{
        increase({commit})
        {
            commit('INCREASE')
        }
    }
}