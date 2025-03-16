<template>
    <van-card
            v-for="team in teamList" :key="team.id"
            :desc="team.description"
    >
        <template #title>
            <span style="margin-right: 10px">{{ team.name }}</span>
            <van-tag :type="team.status == 0 ? 'success' : team.status == 1 ? 'danger' : 'warning'" plain
                     style="margin-right: 8px; margin-top: 8px;">
                {{ teamStatus[team.status] }}
            </van-tag>
        </template>
        <template #bottom>
            <div>
                过期时间: {{ team.expireTime }}
            </div>
            <div>
                队伍人数: {{ team.userList.length }} / {{ team.maxNum }}
            </div>
        </template>
        <template #footer>
            <van-button v-if="currentUser?.id == team.userId" plain size="small" type="primary"
                        @click="doUpdateTeam(team.id)">更新队伍
            </van-button>
            <van-button v-if="!isJoinTeam(team.id)" plain size="small" type="success"
                        @click="doJoinTeam(team.id,team.status)">加入队伍
            </van-button>
            <van-button v-if="isJoinTeam(team.id)" plain size="small" type="warning" @click="doQuitTeam(team.id)">
                退出队伍
            </van-button>
            <van-button v-if="currentUser?.id == team.userId" plain size="small" type="danger"
                        @click="doDeleteTeam(team.id)">解散队伍
            </van-button>
        </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" show-cancel-button title="房间密码"
                @confirm="doJoinTeam(doTeamId,doStatus)">
        <van-field v-model="password" placeholder="请输入房间密码" type="password"/>
    </van-dialog>
</template>

<script lang="ts" setup>
import type {TeamType} from "../models/team";
import {defineProps, withDefaults, defineEmits} from "vue";
import {teamStatus} from "../constants/team.ts";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.ts";
import router from "../config/router.ts";

interface TeamCardListProps {
    teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
    teamList: () => [] as TeamType[],
});
const emits = defineEmits(["updateList"]);
const currentUser = ref();
const showPasswordDialog = ref(false)
const password = ref("")
const doTeamId = ref(0)
const doStatus = ref(0)

const getUserInfo = async () => {
    const data = await getCurrentUser();
    console.log(data);
    if (data) {
        currentUser.value = data;
    } else {
        showFailToast('获取用户信息失败');
    }
};
getUserInfo()

/**
 * 判断是否加入队伍
 * @param teamId
 * @returns {boolean}
 */
const isJoinTeam = (teamId) => {
    let teamUserList = props.teamList.find((item) => item.id == teamId)?.userList;
    if (teamUserList && teamUserList.length > 0) {
        return teamUserList.findIndex((item) => item.id == currentUser.value?.id) > -1;
    }
    return false;
}

/**
 * 加入队伍
 * @param teamId
 */
const doJoinTeam = async (teamId: number, status: number) => {
    console.log(teamId);
    if (status === 2 && !showPasswordDialog.value) {
        doTeamId.value = teamId;
        doStatus.value = status
        return showPasswordDialog.value = true
    }
    const res = await myAxios.post("/team/join", {
        teamId: teamId,
        password: password.value
    });
    if (res.code == 0) {
        showSuccessToast('加入队伍成功');
        emits('updateList');

    } else {
        showFailToast(res.description ? res.description : '加入队伍失败 ');
    }
}

/**
 * 退出队伍
 * @param teamId
 */
const doQuitTeam = async (teamId: number) => {
    const res = await myAxios.post("/team/quit", {
        teamId: teamId,
    });
    if (res.code == 0) {
        showSuccessToast('退出队伍成功');
        emits('updateList');
    } else {
        showFailToast(res.description ? res.description : '退出队伍失败 ');
    }
}

/**
 * 解散队伍
 * @param teamId
 */
const doDeleteTeam = async (teamId: number) => {
    const res = await myAxios.post("/team/delete", {
        id: teamId,
    });
    if (res.code == 0) {
        showSuccessToast('解散队伍成功');
        emits('updateList');
    } else {
        showFailToast(res.description ? res.description : '解散队伍失败 ');
    }
}

const doUpdateTeam = (teamId: number) => {
    router.push({
        path: '/team/update',
        query: {
            teamId: teamId,
        }
    });
}
</script>

<style scoped>

</style>