<template>
  <div class="box">
    <el-dialog
      :title="info.isAdd == true ? '商品分类添加' : '商品分类修改'"
      :visible.sync="info.isShow" @close="rem"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级分类">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" :required="true">
          <el-input
            v-model="form.catename"
            class="a"
            placeholder="请输入分类名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="图片" >
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

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
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
import { reqCate, reqCateEdi, reqCateXiu } from "../../../util/request";
import { success, warning } from "../../../util/alert.js";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
      imgUrl:'',
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({
      // 1 取出仓库的list数据
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqchanglist: "cate/reqchanglist",
    }),
    rem() {
      this.info.isShow = false;
      this.emty();
    },

    emty() {
      this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
      this.imgUrl = ""
    },
    // 图片上传
    changFil(e) {
      let file = e.raw;
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file
    },
    // 点击添加
    add() {
      console.log(this.form);
      console.log(this.imgUrl);
      reqCate(this.form).then((res) => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.rem();
          this.reqchanglist();
        } else {
          warning(res.data.msg);
        }
      });
    },

    edi(id) {
      reqCateEdi(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$imgUrl + res.data.list.img
      });
    },

    xiugai() {
      reqCateXiu(this.form).then((res) => {
        if (res.data.code === 200) {
          success(res.data.msg);
          this.rem();
          this.reqchanglist();
        } else {
          warning(res.data.msg);
        }
      });
    },
  },
  mounted() {
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