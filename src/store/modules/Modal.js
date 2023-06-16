


export default {
    namespaced:true,
    state:{
        Open:false,
        },
    getters:{
        
        Active:(state) => state.Open,

    },
    mutations:{
        OPEN:(state)=>{
            state.Open = true
        },
        CLOSE:(state)=>
        {
           state.Open = false
        },
    },
    actions:{
        open:(context)=>{
            context.commit('OPEN')
        },
        close:(context)=>{
            context.commit('CLOSE')
        },
    }
}