<template>
    <van-search v-model="searchText" placeholder="请输入搜索关键词"  @search="onSearch" />
  <TeamCardList :teamList="teamList" @updateList="getTeamList" />
    <van-empty v-if="teamList.length == 0" description="数据为空" />
</template>

<script setup>
import { useRouter } from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {showSuccessToast} from "vant";
import myAxios from "../plugins/myAxios.js";
import {ref} from "vue";

const router = useRouter();

const searchText = ref("");
const teamList = ref([]);
const doAddTeam = () => {
    router.push("/team/add");
}


const getTeamList = async (val = "") => {
    const res = await myAxios.get("/team/list/my/join",{
        params: {
            searchText: val,
        }
    });
    if (res.code == 0) {
        teamList.value = res.data;
        // showSuccessToast('获取队伍列表成功');
    }else{
        showFailToast('获取队伍列表失败');
    }
}
getTeamList()
const onSearch = () => getTeamList(searchText.value);
</script>

<style scoped>

</style>