
// 设置接口
import User, {UserModel} from "../../models/User";

export interface IUserService {
    /**
     * 获取用户信息
     */
    getUserInfo(user: UserModel): Promise<UserModel|null>;
    /**
     * 获取用户信息 通过用户名
     */
    getUserInfoByName(user: UserModel): Promise<any>;

    /**
     * 获取用户列表
     */
    getUserList(): Promise<any>;

    /**
     * 添加用户
     */
    addUser(user: UserModel): Promise<any>;

    /**
     * 初始化
     */
    init(): void;

}
