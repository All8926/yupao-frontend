<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                    v-model="addTeamData.name"
                    :rules="[{ required: true, message: '请填写队伍名称' }]"
                    label="队伍名称"
                    placeholder="用户名"
            />
            <van-field
                    v-model="addTeamData.description"
                    :rules="[{ required: true, message: '请填写队伍描述' }]"
                    autosize
                    label="队伍描述"
                    placeholder="请输入队伍描述"
                    rows="1"
                    type="textarea"
            />
            <van-field
                    v-model="addTeamData.expireTime"
                    is-link
                    label="过期时间"
                    name="datePicker"
                    placeholder="点击选择过期时间"
                    readonly
                    @click="showPicker = true"
            />

            <van-field label="房间状态" name="radio">
                <template #input>
                    <van-radio-group v-model="addTeamData.status" direction="horizontal">
                        <van-radio :name="0">公开</van-radio>
                        <van-radio :name="1">私有</van-radio>
                        <van-radio :name="2">加密</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field
                    v-if="addTeamData.status === 2"
                    v-model="addTeamData.password"
                    :rules="[{ required: true, message: '请填写密码' }]"
                    label="密码"
                    name="密码"
                    placeholder="密码"
                    type="password"
            />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button block native-type="submit" round type="primary">
                提交
            </van-button>
        </div>
    </van-form>
    <van-popup v-model:show="showPicker" destroy-on-close position="bottom">
        <van-date-picker
                :model-value="expireTime"
                @cancel="showPicker = false"
                @confirm="onConfirm"
                :min-date="minDate"
        />
    </van-popup>
</template>

<script setup>
import {ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showSuccessToast} from "vant";
import {useRouter,useRoute} from "vue-router";

const router = useRouter();
const route = useRoute();

const teamId = route.query?.teamId;
const minDate = new Date();
const showPicker = ref(false);
const expireTime = ref([]);
const addTeamData = ref({
    name: "",
    description: "",
    expireTime: "",
    maxNum: 0,
    password: "",
    status: 0,
});
const onConfirm = ({selectedValues}) => {
    addTeamData.value.expireTime = selectedValues.join('-');
    showPicker.value = false;
};

const getTeamInfo = async () => {
    if(!teamId) {
        return showFailToast("队伍不存在");
    }
    const res = await myAxios.get("/team/get", {
        params: {
            teamId: teamId,
        }
    });
    if(res.code == 0 && res.data) {
        addTeamData.value = res.data;
    }else {
        showFailToast("获取队伍信息失败");
    }
};
getTeamInfo()
/**
 * 提交更新
 * @returns {Promise<void>}
 */
const onSubmit = async () => {
    const res = await myAxios.post("/team/update", addTeamData.value);
    if(res.code == 0 && res.data) {
        showSuccessToast("更新成功");
        router.back();
    }else {
        showFailToast("更新失败");
    }
};
</script>

<style scoped>

</style>