import myAxios from "../plugins/myAxios.ts";
import {  setCurrentUserState} from "../states/user.ts";


/**
 * 获取当前登录用户
 */
 export  const getCurrentUser = async () => {
    const res = await myAxios.get("/user/current");
    if (res.code === 0 && res.data) {
        setCurrentUserState(res.data);
      return res.data;
    }
    return null;
}