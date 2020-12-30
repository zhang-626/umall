import { reqManageList, reqManageNum } from '../../util/request.js'


const state = {
    list: [],
    total: 0,
    size: 3,
    page: 1
}

const mutations = {
    changlist(state, arr) {
        state.list = arr
    },
    changNum(state, num) {
        state.total = num
    },
    changPage(state, num) {
        state.page = num
    }
}

const actions = {
    reqchanglist(context) {
        reqManageList({ page: context.state.page, size: context.state.size }).then(res => {
            // 如果取list的时候，取到null，那么有可能是最后一页没数据，需要减一页，再次请求list
            let list = res.data.list ? res.data.list : []

            if (context.state.page > 1 && list.length == 0) {
                context.commit('changPage', context.state.page-1),
                context.dispatch('reqchanglist'),
                context.dispatch('reqchangNum')
                return
            }

            context.commit('changlist', res.data.list)
        })
    },
    reqchangNum(context) {
        reqManageNum().then(res => {
            context.commit('changNum', res.data.list[0].total)
        })
    },
    reqchangPage(context, num) {
        // 组件修改了页码
        context.commit('changPage', num),
            // 重新请求list数据
            context.dispatch('reqchanglist')
    }
}

const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    },
    page(state) {
        return state.page
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}