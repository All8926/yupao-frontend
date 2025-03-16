<template>
    <van-cell center :title="isMatchMode ? '匹配模式':'默认模式'">
        <template #right-icon>
            <van-switch v-model="isMatchMode" />
        </template>
    </van-cell>
    <UserCardList :userList="userList"/>
    <van-empty v-if="userList.length == 0" description="数据为空" />


</template>

<script lang="ts" setup>
import type {UserType} from "../models/user";
import {ref, watchEffect} from "vue";
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios";
import QS from "qs";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();

const tags = route.query.tags as string[];
const isMatchMode = ref(false);

const userList = ref([]);



const loadDefaultData = async () => {
   const res = await myAxios.get("/user/recommend", {
       params: {
           pageNum: 1,
           pageSize: 10,
       },
       paramsSerializer: function (params) {
           console.log(params);
           return QS.stringify(params, {indices: false})
       },
   })
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

}

const loadMatchData = async () => {
    const res = await myAxios.get("/user/match", {
        params: {
            num: 5
        },
        paramsSerializer: function (params) {
            console.log(params);
            return QS.stringify(params, {indices: false})
        },
    })
    let userListData = res.data;
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

}

watchEffect(() => {
    if(isMatchMode.value){
        loadMatchData()
    }else {
        loadDefaultData()
    }
})
</script>

<style scoped></style>
