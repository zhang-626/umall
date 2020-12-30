<template>
  <div class="box">
    <el-dialog
      :title="info.isAdd == true ? '添加管理员' : '修改管理员'"
      :visible.sync="info.isShow"
      @close="rem"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称" :required="true">
          <el-input
            v-model="form.title"
            class="a"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="活动期限" :required="true">
          <el-time-picker
            is-range
            v-model="aaa"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            format="HH:mm:ss"
          >
          </el-time-picker>
        </el-form-item>

        <el-form-item label="一级分类" :required="true">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择"
            @change="changFirst"
          >
            <el-option label="请选择" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :required="true">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option label="请选择" :value="0"></el-option>
            <el-option
              v-for="item in arr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品">
          <el-select v-model="form.goodsid" placeholder="请选择">
            <el-option label="请选择" :value="0"></el-option>
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
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
import {
  reqCateList,
  reqFalsh,
  reqFalshOne,
  reqFalshsXiu,
} from "../../../util/request";
import { success, warning } from "../../../util/alert.js";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      aaa: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      imgUrl: "",
      form: {
        title: "", //商品名
        begintime: "",
        endtime: "",
        goodsid: "",
        first_cateid: "", //一级
        second_cateid: "", //二级
        status: 1, //状态
      },
      // 用来渲染二级分类的
      arr: [],
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      // 1 取出商品分类的的list数据
      list: "cate/list",
      // 2 取出商品管理的list数据
      goodsList: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
      reqchangCatelist: "cate/reqchanglist",
      reqchangGoodslist: "goods/reqchanglist",
      // 3
      reqchangFalshlist: "falsh/reqchanglist",
    }),
    // 当一级分类改变的时候触发 修改二级分类
    changFirst() {
      reqCateList({ pid: this.form.first_cateid }).then((res) => {
        (this.form.second_cateid = ""), (this.arr = res.data.list);
      });
    },
    rem() {
      this.info.isShow = false;
      this.emty();
    },

    emty() {
      this.form = {
        title: "", //商品名
        begintime: "",
        endtime: "",
        goodsid: "",
        first_cateid: "", //一级
        second_cateid: "", //二级
        status: 1, //状态
      };
    },
    // 点击添加管理员
    add() {
      let data = new Date(this.aaa[0]);
      let data1 = new Date(this.aaa[1]);
      this.form.begintime = data.getTime(this.aaa[0]);
      this.form.endtime = data1.getTime(this.aaa[1]);

      reqFalsh(this.form).then((res) => {
        if (res.data.code === 200) {
          success(res.data.msg);
          this.rem();
          this.reqchangFalshlist();
        } else {
          warning(res.data.msg);
        }
      });
    },

    // 获取一条数据
    edi(id) {
      reqFalshOne(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        let data = new Date(this.form.begintime * 1);
        let data1 = new Date(this.form.endtime * 1);
        this.aaa = [
          new Date(this.form.begintime * 1),
          new Date(this.form.endtime * 1),
        ];

        // 处理二级分类
        reqCateList({ pid: this.form.first_cateid }).then((res) => {
          this.arr = res.data.list;
        });
      });
    },

    xiugai() {
      let data = new Date(this.aaa[0]);
      let data1 = new Date(this.aaa[1]);
      this.form.begintime = data.getTime(this.aaa[0]);
      this.form.endtime = data1.getTime(this.aaa[1]);
      reqFalshsXiu(this.form).then((res) => {
        if (res.data.code === 200) {
          success(res.data.msg);
          this.rem();
          this.reqchangFalshlist();
        } else {
          warning(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqchangCatelist();

    this.reqchangGoodslist();
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #000;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #e2e2e2;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  background-color: #f4f4f4;
  border: 2px dashed #ccc;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>