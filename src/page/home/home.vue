<template>
  <div>
    <h2>商品分类数量</h2>
    <div id="box"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import echarts from "echarts";

export default {
  watch: {
    list: {
      handler() {
        var myChart = echarts.init(document.getElementById("box"));
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: "商品分类数量",
          },
          tooltip: {},
          legend: {
            data: ["数量"],
          },
          xAxis: {
              type:'category',
            data: this.list.map(item=>item.catename),
          },
          yAxis: {
              type:'value',
          },
          series: [
            {
              name: "数量",
              type: "line",
              data: this.list.map(item=>item.children.length),
            },
          ],
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      deep:true
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqchanglist: "cate/reqchanglist",
    }),
  },
  mounted() {
    this.reqchanglist();
  },
};
</script>
<style scoped>
#box{
    width: 80%;
    height: 400px;
    margin: 20px auto;
}
</style>