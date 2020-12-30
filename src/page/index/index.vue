<template>
  <div>
    <el-container class="box">
      <el-aside width="200px">
        <el-menu
          :default-openeds="['1', '3']"
          active-text-color="#ffd04b"
          background-color="#20222a"
          router
          unique-opened
        >
          <el-submenu index="/home" class="aside">
            <template slot="title" class="a" ref="aaa">
              <!-- <el-menu-item class="b" index="/home">
               <i class="el-icon-message"></i>
              <span>首页</span>
              </el-menu-item> -->
              <i class="el-icon-message"></i>
              <span>首页</span>
            </template>
          </el-submenu>

          <!-- 动态侧边栏 -->
          <div v-for="item in list.menus" :key="item.id">
            <!-- 目录 -->
            <el-submenu
              :index="item.id + ''"
              class="aside"
              v-if="item.children"
            >
              <template slot="title" class="a"
                ><i :class="item.icon"></i
                ><span>{{ item.title }}</span></template
              >
              <el-menu-item
                class="b"
                v-for="i in item.children"
                :key="i.id"
                :index="i.url"
                >{{ i.title }}</el-menu-item
              >
            </el-submenu>
            <!-- 菜单 -->
            <el-menu-item :index="item.url" v-else>{{
              item.title
            }}</el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span>{{ list.username }}</span>
          <el-button type="warning" @click="tui">退出登录</el-button>
        </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "userinfo",
    }),
  },
  methods: {
    ...mapActions({
      requserinfo: "requserinfo",
    }),
    // 退出登录
    tui() {
      this.requserinfo({});
      this.$router.push("/login");
    },
    tohome(){
      console.log('aaa');
      // this.$router.to('/home')
    }
  },
  mounted() {
    // console.log(this.$refs.aaa);
  },
};
</script>
<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #20222a;
  color: #333;
  /* text-align: center; */
  line-height: 200px;
}

.el-main {
  background-color: #fff;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
  height: calc(100vh - 60px);
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu-item {
  background-color: #20222a;
  color: #fff;
}
.active-text-color {
  background-color: red;
}
.el-submenu__title span {
  color: #fff;
}
/* .box {
  height: 100vh;
} */
.aside {
  background-color: #20222a;
}
.aside .el-icon-arrow-down:before {
  content: "";
}
</style>