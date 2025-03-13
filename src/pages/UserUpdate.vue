<template>
  <van-cell
    title="昵称"
    is-link
    :value="currentUser.username"
    @click="toEdit('昵称', 'username', currentUser.username)"
  />
  <van-cell title="账号" is-link :value="currentUser.userAccount" />
  <van-cell title="头像" is-link>
    <img style="height: 38px" :src="currentUser.avatarUrl" alt="" />
  </van-cell>
  <van-cell title="性别" is-link :value="gender" @click="toEdit('性别', 'gender', gender)" />
  <van-cell title="电话" is-link :value="currentUser.phone" @click="toEdit('电话', 'phone', currentUser.phone)" />
  <van-cell title="邮箱" is-link :value="currentUser.email" @click="toEdit('邮箱', 'phone', currentUser.email)" />
  <van-cell title="编号" :value="currentUser.planetCode" />
  <van-cell title="注册时间" :value="currentUser.createTime" />
</template>

<script setup lang="ts">
import { ref,computed } from "vue";
import { useRouter } from "vue-router";
import type { UserType } from "../models/user";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";
import {getCurrentUser} from "../services/user.ts";

const router = useRouter();

const currentUser = ref({
    id: 1,
    username: "张三",
    userAccount: "admin",
    avatarUrl: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
    gender: 1,
    phone: "18596969696",
    email: "123@qq.com",
    planetCode: "1",
    profile: "个人简介个人简介个人简介个人简介个人简介",
    createTime: new Date(),
    userStatus: 0,
    updateTime: new Date(),
    userRole: 1,
    tags: [],
});

const gender = computed(() => {
  return currentUser.gender === 1 ? "男" : "女";
});

const toEdit = (title: string, editKey: string, currentValue: string) => {
  router.push({
    path: "/user/edit",
    query: {
      title,
      editKey,
      currentValue,
    },
  });
};

const getUserInfo = async () => {
  const data = await getCurrentUser();
  if (data) {
    currentUser.value = data;
    showSuccessToast('获取用户信息成功');
  }else {
      showFailToast('获取用户信息失败');
  }
};

getUserInfo()
</script>

<style scoped></style>
