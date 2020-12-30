<template>
  <div>
    <el-table :data="list" stripe style="width: 100%" border row-key="id">
      <el-table-column prop="id" label="规格编号" width="150">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="300">
      </el-table-column>
      <el-table-column prop="rolename" label="规格属性" width="300">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" sortable width="300">
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
          <v-del @del="del(scope.row.id)"></v-del>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="nextChange"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { success, warning } from "../../../util/alert.js";
import { reqSpecsRem } from "../../../util//request";

export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "specs/list",
      total: "specs/total",
      size: "specs/size",
      page: "specs/page",
    }),
  },
  methods: {
    ...mapActions({
      reqchanglist: "specs/reqchanglist",
      reqchangNum: "specs/reqchangNum",
      reqchangPage: "specs/reqchangPage",
    }),
    del(id) {
      reqSpecsRem(id).then((res) => {
        if (res.data.code === 200) {
          success(res.data.msg);
          this.reqchanglist();
        } else {
          warning(res.data.msg);
        }
      });
    },
    // 点击编辑菜单
    edi(id) {
      this.$emit("ediAdd", id);
    },
    // 修改了当前页码
    nextChange(e) {
      this.reqchangPage(e);
    },
  },
  mounted() {
    // 请求列表数据
    this.reqchanglist();
    // 请求数据总条数
    this.reqchangNum();
  },
};
</script>
<style scoped>
</style>


