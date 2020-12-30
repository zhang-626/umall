<template>
  <div class="box">
    <el-dialog
      :title="info.isAdd == true ? '添加菜单' : '修改菜单'"
      :visible.sync="info.isShow"
    @close="rem">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色名称" :required="true">
          <el-input
            v-model="form.rolename"
            class="a"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色权限">
          <el-tree
            :data="list"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
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
import { reqRole, reqRoleEdi, reqRoleXiuGai } from "../../../util/request";
import { childrenPath } from "../../../router/index.js";
import { success, warning } from "../../../util/alert.js";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {},
      form: {
        rolename: "",
        menus: "[]",
        status: 1,
      },
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
        rolename: "",
        menus: "[]",
        status: 1,
      };
    },
    // 添加数据
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRole(this.form).then((res) => {
        if (res.data.code === 200) {
          success(res.data.msg);
          //   清空数据并关闭弹窗
          this.rem();
          //   刷新列表
          this.reqchangRolelist();
        } else {
          warning(res.data.msg);
        }
      });
    },
    edi(id) {
      reqRoleEdi(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus))
      });
    },
    xiugai() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleXiuGai(this.form).then((res) => {
        if (res.data.code === 200) {
          success(res.data.msg);
            this.rem();
          this.reqchangRolelist();
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
    // getCheckedKeys() {
    //     console.log(this.$refs.tree.getCheckedKeys());
    //   },
    ...mapActions({
      reqchanglist: "menu/reqchanglist",
      reqchangRolelist: "role/reqchanglist",
    }),
  },
  mounted() {
      console.log(333)
    //   一进来就请求menu的list数据
    if (this.list.length === 0) {
      this.reqchanglist();
    }
  }
};
</script>
<style scoped>
.box {
  width: 600px;
  margin: 50px auto;
}
</style>