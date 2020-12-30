<template>
  <div>
    <el-table :data="list" stripe style="width: 100%" border row-key="id"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="id" label="编号" width="150">
      </el-table-column>
      <el-table-column prop="title" label="轮播图名称" width="300">
      </el-table-column>
      <el-table-column prop="img" label="图片" width="300">
        <template slot-scope="scope">
          <div class="aaa">
            <img :src="$imgUrl+scope.row.img" alt="">
          </div>
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

  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { success, warning } from "../../../util/alert.js";
import { reqBannerRem } from "../../../util//request";

export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "banner/list",

    }),
  },
  methods: {
    ...mapActions({
      reqchanglist: "banner/reqchanglist"
    }),
    del(id) {
      reqBannerRem(id).then((res) => {
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
  },
  mounted() {
        // 请求列表数据
    this.reqchanglist()
  },
};
</script>
<style scoped>
.aaa{
  width: 100px;
  margin: auto;
}
.aaa img{
  line-height: 100px;
  width: 100px;
}
</style>


