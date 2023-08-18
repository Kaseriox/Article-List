import {io} from 'socket.io-client'
export default {
    namespaced:true,
    state:{
        socket:undefined
    },
    getters:{
        socket:(state)=>{return state.socket}
    },
    mutations:{
        SET_SOCKET(state,payload)
        {
            state.socket = payload
        }
    },
    actions:{
      async connect_socket({commit})
      {
        const socket = await io.connect('http://localhost:3025')
        commit('SET_SOCKET',socket)
      }
    }
}