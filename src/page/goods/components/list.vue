<template>
  <div>
    <el-table :data="list" stripe style="width: 100%" border row-key="id">
      <el-table-column prop="id" label="商品编号" width="80">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="150">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="150">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="150">
      </el-table-column>
      <el-table-column prop="img" label="图片"  width="150">
        <template slot-scope="scope">
          <div class="aaa">
            <img :src="$imgUrl + scope.row.img" alt="" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品" sortable  width="120">
        <template slot-scope="scope">
          <el-button type="primary" circle v-if="scope.row.isnew == 1">是</el-button>
          <el-button type="danger" circle v-else>否</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="ishot" label="是否热卖" sortable  width="120">
        <template  slot-scope="scope">
          <el-button type="primary" circle v-if="scope.row.ishot == 1">是</el-button>
          <el-button type="danger" circle v-else>否</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态" sortable width="100">
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
import { reqGoodsRem } from "../../../util//request";

export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      total: "goods/total",
      size: "goods/size",
      page: "goods/page",
    }),
  },
  methods: {
    ...mapActions({
      reqchanglist: "goods/reqchanglist",
      reqchangNum: "goods/reqchangNum",
      reqchangPage: "goods/reqchangPage",
    }),
    del(id) {
      reqGoodsRem(id).then((res) => {
        if (res.data.code === 200) {
          success(res.data.msg);
          this.reqchanglist();
          this.reqchangNum()
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
    if(this.list.length == 0){
    this.reqchanglist();
    }
    // 请求数据总条数
    this.reqchangNum();
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


