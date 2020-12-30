<template>
  <div class="box">
    <el-dialog
      :title="info.isAdd == true ? '添加菜单' : '修改菜单'"
      :visible.sync="info.isShow"
    @close="rem">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称" :required="true">
          <el-input
            v-model="form.title"
            class="a"
            placeholder="请输入菜单名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="上级菜单">
          <el-select v-model="form.pid" placeholder="请选择" @change="changPid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型">
          <el-radio-group v-model="form.type" disabled>
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="菜单图标" v-if="form.type == 1">
          <el-select v-model="form.icon" placeholder="请选择菜单图标">
            <el-option v-for="item in icon" :key="item" :value="item"
              ><i :class="item"></i
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" v-else>
          <el-select v-model="form.url" placeholder="请选择上级菜单">
            <el-option
              v-for="item in routerA"
              :key="item.path"
              :label="item.name"
              :value="'/' + item.path"
            ></el-option>
          </el-select>
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
        <el-button type="info" @click="rem">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="xiugai" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqmenu, reqEdi, reqXiuGai } from "../../../util/request";
import { childrenPath } from "../../../router/index.js";
import { success, warning } from "../../../util/alert.js";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      routerA: childrenPath,
      icon: [
        "el-icon-user-solid",
        "el-icon-phone",
        "el-icon-warning",
        "el-icon-circle-plus",
        "el-icon-info",
      ],
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      a: true,
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      // 1 取出仓库的list数据
      list: "menu/list",
    }),
  },
  methods: {
    rem() {
      this.info.isShow = false;
      this.emty();
    },
    emty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
        dz: "",
      };
    },
    add() {
      reqmenu(this.form).then((res) => {
        if (res.data.code === 200) {
          success(res.data.msg);
          this.rem();
          this.reqchanglist();
        } else {
          warning(res.data.msg);
        }
        console.log(res);
      });
    },
    edi(id) {
      reqEdi(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id
      });
    },

    // 修改数据
    // 1 点击list的编辑按钮让add显示，子传父，通过自定义事件通知父组件
    // 2 在menu页面添加一个状态isadd，用该状态判断add的显示是添加还是修改 点击添加状态为true，点击编辑状态为false
    // 3 在list页面自定义事件的时候将该条数据的id传给menu
    // 4 在add页面床架创建一个方法，用来接收这条数据的内容，  在list点击编辑的时候通知父组件执行自定义事件 并让menu通过ref来获取add
    //      组件，并直接调用执行add组件中的接收数据的方法
    // 5 在add页面中，将已经获取的菜单数据 赋值给this.form 并添加一个this.form.id = id（传来的id）
    // 6 点击修改按钮的时候调用后端接口，将数据传给后端数据库
    xiugai() {
      reqXiuGai(this.form).then((res) => {
        if (res.data.code === 200) {
          success(res.data.msg);
          this.rem();
          this.reqchanglist();
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
    ...mapActions({
      reqchanglist: "menu/reqchanglist",
    }),
  },
  mounted() {},
};
</script>
<style scoped>
.box {
  width: 600px;
  margin: 50px auto;
}
</style>