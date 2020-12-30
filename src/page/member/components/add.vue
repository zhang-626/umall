<template>
  <div class="box">
    <el-dialog title="修改会员" :visible.sync="info.isShow" @close="rem">
      <el-form ref="form" :model="form" label-width="80px">

        <el-form-item label="手机号" :required="true">
          <el-input
            v-model="form.phone"
          ></el-input>
        </el-form-item>

        <el-form-item label="昵称" :required="true">
          <el-input
            v-model="form.nickname"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" :required="true">
          <el-input
            v-model="form.password"
            class="a"
            placeholder="请输入密码"
          ></el-input>
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
        <el-button type="primary" @click="xiugai">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqMemberOne, reqMemberXiu } from "../../../util/request";
import { childrenPath } from "../../../router/index.js";
import { success, warning } from "../../../util/alert.js";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        uid: 0,
        nickname: "",
        password: "",
        phone: "",
        status: 1,
      },
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqchanglist:'member/reqchanglist'
    }),
    rem() {
      this.info.isShow = false;
      this.emty();
    },

    emty() {
      this.form = {
        uid: 0,
        nickname: "",
        password: "",
        phone: "",
        status: 1,
      };
    },
    edi(uid) {
      reqMemberOne(uid).then((res) => {
        this.form = res.data.list;
        this.form.password = ''
      });
    },

    xiugai() {
      reqMemberXiu(this.form).then((res) => {
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
.box {
  width: 600px;
  margin: 50px auto;
}
</style>