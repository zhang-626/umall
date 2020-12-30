<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="菜单编号" sortable width="180">
      </el-table-column>

      <el-table-column prop="title" label="菜单名称" sortable width="180">
      </el-table-column>

      <el-table-column prop="icon" label="菜单图标" sortable width="180">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>

      <el-table-column prop="url" label="菜单地址" sortable width="180">
      </el-table-column>

      <el-table-column prop="flag" label="状态" sortable width="200">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary" round
            >启用</el-button
          >
          <el-button v-else type="info" round>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="cao" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edi(scope.row.id)">编辑</el-button>
          <!-- <el-button type="danger" @click="rem(scope.row.id)">删除</el-button> -->
          <v-del @del="del(scope.row.id)"></v-del>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqmenuRem } from "../../../util/request";
import { success, warning } from "../../../util/alert.js";

export default {
  props: [],
  components: {},
  data() {
    return {
      tableData: [],
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      reqchanglist: "menu/reqchanglist",
    }),
    // 删除菜单
    // rem(id) {
    //   this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   }).then(() => {
    //       reqmenuRem(id).then((res) => {
    //         if (res.data.code === 200) {
    //           success(res.data.msg);
    //           this.reqchanglist();
    //         } else {
    //           warning(res.data.msg);
    //         }
    //       });
    //     }).catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除",
    //       });
    //     });
    // },
    // 新删除接口
    del(id) {
      reqmenuRem(id).then((res) => {
        if (res.data.code === 200) {
          success(res.data.msg);
          this.reqchanglist();
        } else {
          warning(res.data.msg);
        }
      });
    },
    // 编辑菜单
    edi(id) {
      console.log(id);
      this.$emit("ediAdd", id);
    },
  },
  mounted() {
    this.reqchanglist();
  },
};
</script>
<style scoped>
.btn {
  display: inline;
  margin: 20px;
}
</style>