<template>
    <van-search v-model="searchText" placeholder="请输入搜索关键词"  @search="onSearch" />
    <van-tabs v-model:active="active" @change="getTeamList(searchText,active)">
        <van-tab title="公开"  :name="0"> </van-tab>
        <van-tab title="加密"  :name="2"> </van-tab>
    </van-tabs>
  <TeamCardList :teamList="teamList" @updateList="getTeamList(searchText,active)" />
    <van-floating-bubble
            axis="xy"
            icon="plus"
            magnetic="x"
            @click="doAddTeam"
          v-model:offset="offset"
    />
    <van-empty v-if="teamList.length == 0" description="数据为空" />
</template>

<script setup>
import { useRouter } from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {showSuccessToast} from "vant";
import myAxios from "../plugins/myAxios.js";
import {teamStatus} from  '../constants/team.js'
import {ref,onMounted} from "vue";


const router = useRouter();

const offset = ref({});
const active = ref(0)
const searchText = ref("");
const teamList = ref([]);
const doAddTeam = () => {
    router.push("/team/add");
}


const getTeamList = async (val = "",status = 0) => {
    const res = await myAxios.get("/team/list_user_list",{
        params: {
            searchText: val,
            status
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

onMounted(() => {
    console.log(window.innerHeight)
    offset.value = {
        y:window.innerHeight - 120
    }
})
</script>

<style scoped>

</style>