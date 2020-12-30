<template>
  <div>
    <el-table :data="list" stripe style="width: 100%" border row-key="id">
      <el-table-column prop="id" label="用户编号" width="150">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="300">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="300">
      </el-table-column>
      <el-table-column prop="status" label="状态" sortable width="300">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary" round>启用</el-button>
          <el-button v-else type="info" round>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="cao" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edi(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

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
      list: "member/list"
    }),
  },
  methods: {
    ...mapActions({
      reqchanglist: "member/reqchanglist",
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
    edi(uid) {
      this.$emit("ediAdd",uid);
    },
  },
  mounted() {
        // 请求列表数据
    this.reqchanglist()
  },
};
</script>
<style scoped>
</style>


