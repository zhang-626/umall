<template>
  <div>
    <v-list @ediAdd="ediA"></v-list>
    <v-add :info="isShow" ref="Add"></v-add>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
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
        isShow: false
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    show() {
      this.isShow.isShow = true
    },
    ediA(e) {
      this.isShow.isShow = true
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