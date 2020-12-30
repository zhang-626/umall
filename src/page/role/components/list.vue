<template>
  <div>
    <el-table :data="list" stripe style="width: 100%" border row-key="id">
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="400">
      </el-table-column>
      <el-table-column prop="status" label="状态" sortable width="400">
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
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { success, warning } from "../../../util/alert.js";
import { reqRoleRem } from "../../../util//request";

export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      reqchanglist: "role/reqchanglist",
    }),
    del(id) {
      reqRoleRem(id).then((res) => {
        if (res.data.code === 200) {
          success(res.data.msg);
          this.reqchanglist()
        }else{
          warning(res.data.msg)
        }
      });
    },
    // 点击编辑菜单
    edi(id){
      console.log(id);
      this.$emit('ediAdd',id)
    }
  },
  mounted() {
    this.reqchanglist();
  },
};
</script>
<style scoped>
</style>


