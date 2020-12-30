import axios from 'axios';
import qs from 'qs';
import store from '../store'
// import vue from 'vue'

let base = "/api";


// 请求拦截 
axios.interceptors.request.use(req=>{
    // 判断 如果不是登录页就添加请求头 
    if(req.url != base+"/api/login"){
        req.headers.authorization = store.state.userinfo.token
    }
    return req
})

// 响应拦截
axios.interceptors.response.use(res => {
    console.group("====本次请求的路径" + res.config.url);
    console.log(res);
    return res
});


// 菜单menu添加数据
export const reqmenu = (from) => {
    return axios({
        url: base + "/api/menuadd",
        method: 'post',
        data: qs.stringify(from)
    })
}


// 菜单menu的list数据
export const reqmenuList = () => {
    return axios({
        url: base + '/api/menulist',
        method: 'get',
        params: {
            istree: true
        }
    })
}


// 获取单一菜单信息列表  用来删除
export const reqmenuRem = (id) => {
    return axios({
        url: base + '/api/menudelete',
        method: 'post',
        data: {
            id: id
        }
    })
}

// 获取一条数据菜单 
export const reqEdi = (id) => {
    return axios({
        url: base + '/api/menuinfo',
        method: 'get',
        params: {
            id: id
        }
    })
}


// 编辑菜单
export const reqXiuGai = (from) => {
    return axios({
        url: base + '/api/menuedit',
        method: 'post',
        data: qs.stringify(from)
    })
}

// ===========角色接口=======================================================
// 角色添加
export const reqRole = (from) => {
    return axios({
        url: base + '/api/roleadd',
        method: 'post',
        data: qs.stringify(from)
    })
}



// 角色列表
export const reqRoleList = () => {
    return axios({
        url: base + '/api/rolelist',
        method: 'get'
    })
}

// 角色获取一条详情列表数据
export const reqRoleEdi = (id) => {
    return axios({
        url: base + '/api/roleinfo',
        method: 'get',
        params: {
            id: id
        }
    })
}

// 角色修改
export const reqRoleXiuGai = (from) => {
    return axios({
        url: base + '/api/roleedit',
        method: 'post',
        data: qs.stringify(from)
    })
}


// 角色删除
export const reqRoleRem = (id) => {
    return axios({
        url: base + '/api/roledelete',
        method: 'post',
        data: {
            id: id
        }
    })
}


// ======================管理员管理======================================
// 添加管理员
export const reqManage = (from) => {
    return axios({
        url: base + '/api/useradd',
        method: 'post',
        data:qs.stringify(from)
    })
}


// 管理员列表 分页
export const reqManageList = (params)=>{
    return axios({
        url:base+'/api/userlist',
        method:'get',
        params:params
    })
}

// 管理员数据 总数
export const reqManageNum = ()=>{
    return axios({
        url:base+'/api/usercount',
        method:'get'
    })
}

// 获取一条管理员数据
export const reqManageOne = (uid)=>{
    return axios({
        url:base+'/api/userinfo',
        method:'get',
        params:{
            uid:uid
        }
    })
}

// 管理员修改
export const reqManageXiu = (from)=>{
    return axios({
        url:base+"/api/useredit",
        method:'post',
        data:qs.stringify(from)
    })
}

// 管理员删除
export const reqManageDel = (uid)=>{
    return axios({
        url:base+'/api/userdelete',
        method:'post',
        data:{
            uid:uid
        }
    })
}

// 管理员登录
export const reqManageLogin = (from)=>{
    return axios({
        url:base+'/api/userlogin',
        method:'post',
        data:qs.stringify(from)
    })
}

// ===========================cate商品分类============================================
// 商品分类cate添加数据
export const reqCate = (from) => {

    let data = new FormData();
    for(let i in from){
        data.append(i,from[i])
    }
    console.log(data)
    return axios({
        url: base + "/api/cateadd",
        method: 'post',
        data: data
    })
}


// 商品分类Cate的list数据
export const reqCateList = (params) => {
    return axios({
        url: base + '/api/catelist',
        method: 'get',
        params: params
    })
}


// 商品分类Cate获取单一菜单信息列表  用来删除
export const reqCateRem = (id) => {
    return axios({
        url: base + '/api/catedelete',
        method: 'post',
        data: {
            id: id
        }
    })
}

// 获取一条数据菜单 
export const reqCateEdi = (id) => {
    return axios({
        url: base + '/api/cateinfo',
        method: 'get',
        params: {
            id: id
        }
    })
}


// 编辑菜单
export const reqCateXiu = (from) => {

    let data = new FormData();
    for(let i in from){
        data.append(i,from[i])
    }
    return axios({
        url: base + '/api/cateedit',
        method: 'post',
        data: data
    })
}


// ===========================specs商规格============================================
// 商品规格specs添加数据
export const reqSpecs = (from) => {

    return axios({
        url: base + "/api/specsadd",
        method: 'post',
        data: qs.stringify(from)
    })
}

// 商品规格specs 总数
export const reqSpecsNum = ()=>{
    return axios({
        url:base+'/api/specscount',
        method:'get'
    })
}

// 商品规格specs的list数据
export const reqSpecsList = (params) => {
    return axios({
        url: base + '/api/specslist',
        method: 'get',
        params: params
    })
}


// 商品规格specs获取单一菜单信息列表  用来删除
export const reqSpecsRem = (id) => {
    return axios({
        url: base + '/api/specsdelete',
        method: 'post',
        data: {
            id: id
        }
    })
}

// 获取一条数据菜单 
export const reqSpecsEdi = (id) => {
    return axios({
        url: base + '/api/specsinfo',
        method: 'get',
        params: {
            id: id
        }
    })
}


// 编辑菜单
export const reqSpecsXiu = (from) => {


    return axios({
        url: base + '/api/specsedit',
        method: 'post',
        data: qs.stringify(from)
    })
}

// ===========================goods商品管理============================================
// goods商品管理e添加数据
export const reqGoods = (from) => {

    let data = new FormData();
    for(let i in from){
        data.append(i,from[i])
    }

    return axios({
        url: base + "/api/goodsadd",
        method: 'post',
        data: data
    })
}

// goods商品全部数量 总数 计算分页
export const reqGoodsNum = ()=>{
    return axios({
        url:base+'/api/goodscount',
        method:'get'
    })
}

// goods商品管理的list数据 分页
export const reqGoodsList = (params) => {
    return axios({
        url: base + '/api/goodslist',
        method: 'get',
        params: params
    })
}


// 商品分类Cate获取单一菜单信息列表  用来删除
export const reqGoodsRem = (id) => {
    return axios({
        url: base + '/api/goodsdelete',
        method: 'post',
        data: {
            id: id
        }
    })
}

// 获取一条数据菜单 
export const reqGoodsEdi = (id) => {
    return axios({
        url: base + '/api/goodsinfo',
        method: 'get',
        params: {
            id: id
        }
    })
}


// 编辑菜单
export const reqGoodsXiu = (from) => {

    let data = new FormData();
    for(let i in from){
        data.append(i,from[i])
    }
    return axios({
        url: base + '/api/goodsedit',
        method: 'post',
        data: data
    })
}   



// ====================member会员管理============================
// 获取会员列表
export const reqMemberlist = ()=>{
    return axios({
        url:base+'/api/memberlist',
        method:'get'
    })
}

// 获取一条会员数据
export const reqMemberOne = (uid)=>{
    return axios({
        url:base+'/api/memberinfo',
        method:'get',
        params:{
            uid:uid
        }
    })
}


// 修改会员数据
export const reqMemberXiu = (from)=>{
    return axios({
        url:base+'/api/memberedit',
        method:'post',
        data:from
    })
}


// ======================banner轮播图==============================================
// banner添加轮播图
export const reqBanner = (from) => {

    let data = new FormData();
    for(let i in from){
        data.append(i,from[i])
    }

    return axios({
        url: base + "/api/banneradd",
        method: 'post',
        data: data
    })
}

// banner轮播图列表
export const reqBannerlist =()=>{
    return axios({
        url: base + "/api/bannerlist",
        method:'get'
    })
}

// banner获取一条轮播图
export const reqBannerOne = (id)=>{
    return axios({
        url:base+'/api/bannerinfo',
        method:'get',
        params:{
            id:id
        }
    })
}

// banner修改数据
export const reqBannersXiu = (from) => {

    let data = new FormData();
    for(let i in from){
        data.append(i,from[i])
    }
    return axios({
        url: base + '/api/banneredit',
        method: 'post',
        data: data
    })
}

// banner删除
export const reqBannerRem = (id) => {
    return axios({
        url: base + '/api/bannerdelete',
        method: 'post',
        data: {
            id: id
        }
    })
}

// ========================falsh秒杀==================================
// falsh活动添加
export const reqFalsh = (from) => {

    return axios({
        url: base + "/api/seckadd",
        method: 'post',
        data: qs.stringify(from)
    })
}

// falsh活动列表
export const reqFalshList = (params) => {
    return axios({
        url: base + '/api/secklist',
        method: 'get',
        params: params
    })
}
// falsh活动获取一条
export const reqFalshOne = (id) => {
    return axios({
        url: base + '/api/seckinfo',
        method: 'get',
        params: {
            id: id
        }
    })
}
// falsh活动修改
export const reqFalshsXiu = (from) => {

    return axios({
        url: base + '/api/seckedit',
        method: 'post',
        data: qs.stringify(from)
    })
}  
// falsh活动删除
export const reqFalshRem = (id) => {
    return axios({
        url: base + '/api/seckdelete',
        method: 'post',
        data: {
            id: id
        }
    })
}
