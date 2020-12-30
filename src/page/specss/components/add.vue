<template>
  <div class="box">
    <el-dialog
      :title="info.isAdd == true ? '商品分类添加' : '商品分类修改'"
      :visible.sync="info.isShow"
      @close="rem"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="规格名称" :required="true">
          <el-input
            v-model="form.specsname"
            class="a"
            placeholder="请输入规格名称"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="规格属性"
          v-for="(item, index) in obj"
          :key="index"
        >
          <div class="aaa">
            <el-input
              v-model="item.value"
              placeholder="请输入规格属性"
            ></el-input>
            <el-button type="primary" v-if="index == 0" @click="addattr"
              >新增规格属性</el-button
            >
            <el-button type="danger" v-else @click="delattr(index)"
              >删除</el-button
            >
          </div>
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
        <el-button type="info" @click="rem">取消</el-button>
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
import { reqSpecs, reqSpecsEdi, reqSpecsXiu } from "../../../util/request";
import { success, warning } from "../../../util/alert.js";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      obj: [
        {
          value: "",
        },
        { value: "" },
      ],
      form: {
        specsname: "",
        attrs: "[]",
        status: 1,
      },
      imgUrl: "",
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
      reqchanglist: "specs/reqchanglist",
      reqchangNum:'specs/reqchangNum'
    }),
    // 点击新增规格属性按钮
    addattr() {
      this.obj.push({ value: "" });
    },
    delattr(index) {
      this.obj.splice(index, 1);
    },
    rem() {
      this.info.isShow = false;
      this.emty();
    },

    emty() {
      this.obj=[
        {value:''},
        {value:''}
      ]
      this.form = {
        specsname: "",
        attrs: "[]",
        status: 1,
      };
      this.imgUrl = "";
    },
    // 点击添加
    add() {
      this.form.attrs = JSON.stringify(this.obj.map((item) => item.value));
      console.log(this.form);
      reqSpecs(this.form).then((res) => {
        if (res.data.code == 200) {
          success(res.data.msg);
          this.rem();
          this.reqchanglist();
          this.reqchangNum()
        } else {
          warning(res.data.msg);
        }
      });
    },

    edi(id) {
      reqSpecsEdi(id).then((res) => {
        this.form = res.data.list[0];
        this.form.id = id;
        this.obj = JSON.parse(this.form.attrs).map(item=>({value:item}))
      });
    },

    xiugai() {
       this.form.attrs = JSON.stringify(this.obj.map((item) => item.value));
      reqSpecsXiu(this.form).then((res) => {
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
        if(this.list.length === 0){
      this.reqchanglist()
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
.aaa {
  display: flex;
}
.aaa button {
  width: 150px;
}
.aaa input {
  flex: 1;
}
</style>