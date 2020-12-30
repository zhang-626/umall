import {reqManageLogin} from "../util/request"


export const actions = {
    requserinfo(context,info){
        context.commit("changUser",info)
    }
}