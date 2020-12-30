<template>
  <div class="box">
    <el-dialog
      :title="info.isAdd == true ? '添加管理员' : '修改管理员'"
      :visible.sync="info.isShow"
      @close="rem"
      @opened="opened"
    >
      <el-form ref="form" :model="form" label-width="80px">
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

        <el-form-item label="商品名称" :required="true">
          <el-input
            v-model="form.goodsname"
            class="a"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>

        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changFil"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="规格名称">
          <el-select
            v-model="form.specsid"
            placeholder="请选择"
            @change="changSpecs"
          >
            <el-option label="请选择" :value="0"></el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性">
          <el-select v-model="form.specsattr" placeholder="请选择" multiple>
            <el-option label="请选择" :value="0"></el-option>
            <el-option
              v-for="item in arr1"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品">
          <el-radio-group v-model="form.isnew">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否热卖">
          <el-radio-group v-model="form.ishot">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item label="商品描述">
          <div id="div1"></div>
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
  reqGoods,
  reqGoodsEdi,
  reqGoodsXiu,
} from "../../../util/request";
import { success, warning } from "../../../util/alert.js";
import E from "wangeditor";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imgUrl: "",
      form: {
        first_cateid: "", //一级
        second_cateid: "", //二级
        goodsname: "", //商品名
        price: "", //价格
        market_price: "", //市场价格
        img: "", //图片
        description: "", //描述
        specsid: "", //规格id
        specsattr: "", //规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖
        status: 1, //状态
      },
      // 用来渲染二级分类的
      arr: [],
      arr1: [],
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      // 1 取出商品分类的的list数据
      list: "cate/list",
      // 2 取出商品规格的list数据
      specsList: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      reqchangCatelist: "cate/reqchanglist",
      reqchangSpecslist: "specs/reqchanglist",
      reqchangGoodslist: "goods/reqchanglist",
      reqchangNum: "goods/reqchangNum",
    }),
    // 当一级分类改变的时候触发 修改二级分类
    changFirst() {
      reqCateList({ pid: this.form.first_cateid }).then((res) => {
        (this.form.second_cateid = ""), (this.arr = res.data.list);
      });
    },
    // 当规格名称发生改变的时候触发 和一级分类一样 这是第二种方法
    changSpecs() {
      // 清空前面渲染的
      this.form.specsattr = [];
      this.arr1 = [];

      let obj = this.specsList.find((item) => item.id == this.form.specsid);
      this.arr1 = obj.attrs;
    },
    rem() {
      this.info.isShow = false;
      this.emty();
    },

    emty() {
      this.form = {
        first_cateid: "", //一级
        second_cateid: "", //二级
        goodsname: "", //商品名
        price: "", //价格
        market_price: "", //市场价格
        img: "", //图片
        description: "", //描述
        specsid: "", //规格id
        specsattr: "", //规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖
        status: 1, //状态
      };
      this.imgUrl = "";
    },
    // 打开动画结束时 触发副本框
    opened() {
      this.editor = new E("#div1");
      this.editor.create();
      // 设置副文本框里的内容是什么
      this.editor.txt.html(this.form.description);
    },
    // 图片上传
    changFil(e) {
      let file = e.raw;
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    // 点击添加管理员
    add() {
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
        // 设置描述是副文本框里的内容
        description: this.editor.txt.html(),
      };
      reqGoods(data).then((res) => {
        if (res.data.code === 200) {
          success(res.data.msg);
          this.rem();
          this.reqchangGoodslist();
          this.reqchangNum();
        } else {
          warning(res.data.msg);
        }
      });
    },

    // 获取一条数据
    edi(id) {
      reqGoodsEdi(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        // 处理图片
        this.imgUrl = this.$imgUrl + res.data.list.img;
        // 处理二级分类
        // 直接调用也行
        // this.changFirst()
        reqCateList({ pid: this.form.first_cateid }).then((res) => {
          console.log(res);
          this.arr = res.data.list;
        });
        // 处理规格属性
        // 直接调用不行
        // this.changSpecs()
        // this.form.specsattr = [];
        // this.arr1 = [];
        this.form.specsattr = JSON.parse(this.form.specsattr);
        let obj = this.specsList.find((item) => item.id == this.form.specsid);
        this.arr1 = obj.attrs;
      });
    },

    xiugai() {
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      reqGoodsXiu(data).then((res) => {
        if (res.data.code === 200) {
          success(res.data.msg);
          this.rem();
          this.reqchangGoodslist();
        } else {
          warning(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.list.length == 0) {
      this.reqchangCatelist();
    }
    if (this.specsList.length == 0) {
      this.reqchangSpecslist(true);
    }
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