export const state = {
    // 在状态层加上一个用户信息
    userinfo:sessionStorage.getItem("userinfo") ? JSON.parse(sessionStorage.getItem("userinfo")) : {}
}
export const mutations = {
    changUser(state,info){
        state.userinfo = info;
        // 本地存储加上一个用户信息
        if(info.id){
            sessionStorage.setItem("userinfo",JSON.stringify(info))
        }else{
            // 登录账号 如果有记录就清空原因的
            sessionStorage.removeItem("userinfo")
        }
    }
}
export const getters = {
    userinfo(){
        return state.userinfo
    }
}