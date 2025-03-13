import myAxios from "../plugins/myAxios.ts";
import {useRouter} from "vue-router";
import {  setCurrentUserState} from "../states/user.ts";

const router = useRouter();

/**
 * 获取当前登录用户
 */
 export  const getCurrentUser = async () => {
    const res = await myAxios.get("/user/current");
    if (res.code === 0 && res.data) {
        setCurrentUserState(res.data);
      return res.data;
    }
    router.push("/user/login");
    return null;
}