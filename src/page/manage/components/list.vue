<template>
  <div>
    <el-table :data="list" stripe style="width: 100%" border row-key="id">
      <el-table-column prop="id" label="用户编号" width="150">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="300">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="300">
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
          <el-button type="primary" @click="edi(scope.row.uid)">编辑</el-button>
          <v-del @del="del(scope.row.uid)"></v-del>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" :total="total" 
    :page-size="size" @current-change="nextChange">
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { success, warning } from "../../../util/alert.js";
import { reqManageDel } from "../../../util//request";

export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "manage/list",
      total:'manage/total',
      size:'manage/size',
      page:'manage/page'
    }),
  },
  methods: {
    ...mapActions({
      reqchanglist: "manage/reqchanglist",
      reqchangNum:'manage/reqchangNum',
      reqchangPage:'manage/reqchangPage'
    }),
    del(uid) {
      reqManageDel(uid).then((res) => {
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
    nextChange(e){
        this.reqchangPage(e)
    }
  },
  mounted() {
        // 请求列表数据
    this.reqchanglist();
        // 请求数据总条数
    this.reqchangNum()
  },
};
</script>
<style scoped>
</style>


