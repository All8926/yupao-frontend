<template>
    <van-card
            v-for="user in props.userList" :key="user.id"
            :desc="user.profile"
            :thumb="user.avatarUrl"
            :title="user.username+' ('+user.planetCode+')'"
    >
        <template #tags>
            <van-tag v-for="tag in user.tags" :key="tag" plain style="margin-right: 8px; margin-top: 8px;"
                     type="primary">{{ tag }}
            </van-tag>
        </template>
        <template #footer>
            <van-button size="small">联系我</van-button>
        </template>
    </van-card>
</template>

<script setup lang="ts">
import type {UserType} from "../models/user";
import {defineProps, withDefaults} from "vue";

interface userCardListProps {
    userList: UserType[];
}

const props = withDefaults(defineProps<userCardListProps>(), {
    userList: () => [] ,
})

</script>

<style scoped>

</style>