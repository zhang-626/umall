<template>
  <div class="bigbox">
    <div class="box">
      <h3>登录</h3>
      <el-input v-model="form.username" placeholder="请输入用户名" class="inp1" clearable></el-input>
      <el-input placeholder="请输入密码" v-model="form.password" show-password class="inp2" clearable></el-input>
      <el-button type="success" round @click="logina">登 录</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {reqManageLogin} from '../../util/request';
import { success, warning } from "../../util/alert.js";
import router from '../../router';
export default {
  props: [],
  components: {},
  data() {
    return {
      form:{
        username:'',
        password:''
      }
    };
  },
  computed: {
    ...mapGetters({
      login:'userinfo'
    }),
  },
  methods: {
    ...mapActions({
      requserinfo:'requserinfo'
    }),
    logina(){
      reqManageLogin(this.form).then(res=>{
        if(res.data.code === 200){
          success(res.data.msg)
          this.requserinfo(res.data.list);
          // 登录跳转
          this.$router.push("/")
        }else{
          warning(res.data.msg)
        }
      })
    }
  },
  mounted() {},
};
</script>
<style scoped>
.bigbox {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(90deg,#563443 0%, #303d60 100%);
}
.box{
    width: 400px;
    height: 200px;
    margin: 200px auto;
    background-color: #fff;
    text-align: center;
    padding: 20px 30px;
    border-radius: 10px;
}
.box .inp1,.inp2{
    margin-bottom: 10px;
}
</style>