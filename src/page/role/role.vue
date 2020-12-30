<template>
  <div>
    <el-button type="primary" class="btn" @click="show">添加</el-button>
    <v-list @ediAdd="ediA"></v-list>
    <v-add :info="isShow" ref="Add"></v-add>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import flashVue from "../flash/flash.vue";
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  props: [],
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      isShow: {
        isShow: false,
        isAdd: true,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    show() {
      this.isShow.isShow = true;
      this.isShow.isAdd = true;
    },
    ediA(e) {
      this.isShow.isShow = true;
      this.isShow.isAdd = false;
      this.$refs.Add.edi(e)
    },
    ...mapActions({}),
  },
  mounted() {
  },
};
</script>
<style scoped>
</style>