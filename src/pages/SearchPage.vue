<template>
  <van-search v-model="searchText" show-action placeholder="请输入搜索标签" @search="onSearch" @cancel="onCancel" />
  <van-divider>选中标签</van-divider>

  <van-row :gutter="[20, 20]">
    <van-col v-for="tag in activeTags" :key="tag">
      <van-tag type="primary" closeable @close="tagClose(tag)">{{ tag }}</van-tag>
    </van-col>
  </van-row>
  <van-divider>选择标签</van-divider>
  <van-tree-select v-model:active-id="activeTags" v-model:main-active-index="activeIndex" :items="tagList" />
<div style="padding: 18px;">
  <van-button type="primary" round  block @click="searchUser">搜索</van-button>
</div>
</template>

<script setup>
import { ref } from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const searchText = ref("");
const activeTags = ref([]);
const activeIndex = ref(0);
const originTagList = [
  {
    text: "性别",
    children: [
      { text: "男", id: "男" },
      { text: "女", id: "女" }, 
    ],
  },
  {
    text: "语言",
    children: [
      { text: "java", id: "java" },
      { text: "C++", id: "C++" },
      { text: "前端", id: "前端" },
    ],
  }, 
];
const tagList = ref(originTagList);
const tagClose = (tag) => {
  activeTags.value = activeTags.value.filter((item) => item !== tag);
};
const onSearch = () => {
  tagList.value = originTagList.map((item) => {
    if (!item.children) return item;
    return {
      ...item,
      children: item.children.filter((child) => child.text.includes(searchText.value)),
    };
  });
};
const onCancel = () => {
  searchText.value = "";
  tagList.value = originTagList;
};
const searchUser = () => {
  router.push({
    path: "/user/list",
    query: {
      tags: activeTags.value,
    },
  });
};
</script>

<style lang="scss" scoped></style>
