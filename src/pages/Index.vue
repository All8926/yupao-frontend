<template>
    <UserCardList :userList="userList"/>
    <van-empty v-if="userList.length == 0" description="数据为空" />
</template>

<script lang="ts" setup>
import type {UserType} from "../models/user";
import {ref} from "vue";
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios";
import QS from "qs";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();

const tags = route.query.tags as string[];

const userList = ref([]);

myAxios.get("/user/recommend", {
    params: {
        pageNum: 1,
        pageSize: 10,
    },
    paramsSerializer: function (params) {
        console.log(params);
        return QS.stringify(params, {indices: false})
    },
}).then((res) => {
    console.log(res);
    let userListData = res.data?.records;
    if (userListData) {
        userListData = userListData.map((item: any) => {
            let tags = JSON.parse(item.tags);
            return {
                ...item,
                tags: tags,
            }
        })
        userList.value = userListData;
        console.log(userList.value);
    }

});
</script>

<style scoped></style>
