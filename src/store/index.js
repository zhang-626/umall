import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import {state,getters,mutations} from './mutations.js';

import {actions} from './actions';
import menu from './modules/menu'
import role from './modules/role'
import manage from './modules/manage'
import cate from './modules/cate'
import specs from './modules/specs'
import goods from './modules/goods'
import member from './modules/member'
import banner from './modules/banner'
import falsh from './modules/falsh'

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    modules:{
        menu,
        role,
        manage,
        cate,
        specs,
        goods,
        member,
        banner,
        falsh
    }
})
