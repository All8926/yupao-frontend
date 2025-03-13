<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                    v-model="editUser.currentValue"
                    :label="editUser.title"
                    :name="editUser.editKey"
                    :placeholder="'请输入' + editUser.title"
                    :rules="[{ required: true, message: '请输入'+ editUser.title }]"
            />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button block native-type="submit" round type="primary">
                提交
            </van-button>
        </div>
    </van-form>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {getCurrentUser} from "../services/user.ts";

const route = useRoute();
const router = useRouter();

const {title, editKey, currentValue} = route.query;
const editUser = ref({
    title: title as string,
    editKey: editKey as string,
    currentValue: currentValue as string,
})

const onSubmit = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return router.push("/user/login")
    }

    const res = await myAxios.post("/user/update", {
        [editUser.value.editKey]: editUser.value.currentValue,
        id: currentUser.id,
    })
    if(res.code == 0){
        showSuccessToast('修改成功');
        router.push("/user")
    }else{
        showFailToast('修改失败');
    }
};

</script>

<style scoped>

</style>