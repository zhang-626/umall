<template>
  <div class="box">
    <el-dialog
      :title="info.isAdd == true ? '添加管理员' : '修改管理员'"
      :visible.sync="info.isShow"
    @close="rem">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid" placeholder="请选择" @change="changPid">
            <el-option label="请选择" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" :required="true">
          <el-input
            v-model="form.username"
            class="a"
            placeholder="请输入用户名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" :required="true">
          <el-input
            v-model="form.password"
            class="a"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="xiugai" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { mapGetters, mapActions } from "vuex";
import { reqManage, reqManageOne, reqManageXiu } from "../../../util/request";
import { childrenPath } from "../../../router/index.js";
import { success, warning } from "../../../util/alert.js";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        roleid:0,
        username:'',
        password:'',
        status:1
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      // 1 取出仓库的list数据
      list: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      reqchanglist: "role/reqchanglist",
      reqchangManagelist:'manage/reqchanglist',
      reqchangNum:'manage/reqchangNum'
      
    }),
    rem() {
      this.info.isShow = false;
      this.emty();
    },

    emty() {
      this.form = {
          roleid:0,
        username:'',
        password:'',
        status:1
      };
    },

    // 点击添加管理员
    add() {
    console.log(this.form);
      reqManage(this.form).then((res) => {
        if (res.data.code === 200) {
          success(res.data.msg);
          this.rem();
          this.reqchangManagelist();
          this.reqchangNum()
        } else {
          warning(res.data.msg);
        }
      });
    },

    edi(uid) {
      reqManageOne(uid).then((res) => {
        this.form = res.data.list;
        this.form.roleid = res.data.list.roleid;
        this.form.password = ''
      });
    },

    xiugai() {
        console.log(this.form);
      reqManageXiu(this.form).then((res) => {
        if (res.data.code === 200) {
          success(res.data.msg);
          this.rem();
          this.reqchangManagelist();
        } else {
          warning(res.data.msg);
        }
      });
    },

    // 判断你的上级菜单是顶级的还是子级的 顶级是目录 子级是菜单
    changPid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
  },
  mounted() {
    if(this.list.length === 0){
      this.reqchanglist()
    }
  },
};
</script>
<style scoped>
.box {
  width: 600px;
  margin: 50px auto;
}
</style>