


export default {
    namespaced:true,
    state:{
        Open:false,
        Component:undefined,
        },
    getters:{
        Active:(state) => state.Open,
        Component:(state)=> state.Component,
    },
    mutations:{
        OPEN:(state)=>{
            state.Open = true
        },
        CLOSE:(state)=>
        {
           state.Open = false
           state.Component = undefined
        },
        SET_COMPONENT:(state,payload)=>
        {
            state.Component = payload
        }
    },
    actions:{
        open:({commit})=>{
            commit('OPEN')
        },
        close:({commit})=>{
            commit('CLOSE')
        },
        set_component({commit},payload)
        {
            commit('SET_COMPONENT',payload)
        }
    }
}