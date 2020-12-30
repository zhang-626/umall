import {reqRoleList} from '../../util/request.js'

const state = {
    list:[]
}

const mutations = {
    changlist(state,arr){
        state.list = arr
    }
}

const actions = {
    reqchanglist(context){
        reqRoleList().then(res=>{
            context.commit('changlist',res.data.list)
        })
    }
}


const getters = {
    list(state){
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}