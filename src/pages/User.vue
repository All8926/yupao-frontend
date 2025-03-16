<template>
    <div class="current_user">
        <van-image
                round
                width="4rem"
                height="4rem"
                fit="cover"
                :src="currentUser?.avatarUrl"
        />
        <span>{{currentUser?.userAccount}}</span>
    </div>
  <van-cell title="更新个人信息" is-link to="/user/update" />
  <van-cell title="我创建的队伍" is-link to="/user/team/create" />
  <van-cell title="我加入的队伍" is-link to="/user/team/join" />
  <van-cell title="重新登录" is-link to="/user/login" />
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
  return currentUser.value?.gender === 1 ? "男" : "女";
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
  }else {
      showFailToast('获取用户信息失败');
  }
};

getUserInfo()
</script>

<style scoped>
.current_user {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
}
</style>
