<template>
  <van-nav-bar title="标题" left-arrow  @click-left="onClickLeft">
    <template #right>
      <van-icon name="search" size="18" @click="doSearch" />
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view />
  </div>

  <van-tabbar route  @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";


const router = useRouter();

const active = ref("index");

const onChange = (name) => {
  // alert(name);
  
};
const doSearch = () => {
  router.push("/search");
};
const onClickLeft = () => {
  router.back();
};
</script>

<style scoped>
#content {
  padding-bottom: 60px;
}
</style>
