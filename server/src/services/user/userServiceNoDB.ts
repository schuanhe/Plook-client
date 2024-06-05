// userService.js
import {UserModel} from '../../models/User';
import {UserTable} from '../../utils/noDBUtil';
import {IUserService} from "./iUserService";



export class UserService implements IUserService{
    getUserInfo(user:UserModel) {
        if (!user?.id)
            return Promise.reject("id不能为空")
        const CUser = UserTable.find(user => user.get("id") === user.id);
        if (CUser) {
            return Promise.resolve(CUser);
        }
        return Promise.reject("用户不存在");
    }
    getUserInfoByName(user: UserModel) {
        const userModel = new UserModel;
        if (!user.username)
            return Promise.reject("用户名不能为空")
        const CUser = UserTable.find(user => user.get("username") === user.username);
        if (CUser){
            return Promise.resolve(CUser);
        }
        return Promise.reject("用户不存在");
    }
    getUserList() {
        return Promise.resolve(UserTable);
    }

    addUser(user:UserModel){
        const userModel = new UserModel;
        if (!user.username || !user.email)
            return Promise.reject("用户名或邮箱不能为空");
        if (UserTable.find(user => user.get("username") === user.username)){
            return Promise.reject("用户名已存在");
        }

        userModel.set("id", UserTable.length + 1)
        userModel.set("username", user.username)
        userModel.set("email", user.email)
        UserTable.push(userModel);

        return Promise.resolve(userModel);
    }

    init(){
        if (UserTable.length === 0){
            const userModel = new UserModel;
            userModel.set("id", 1)
            userModel.set("username", "admin")
            userModel.set("email", "admin@admin.com")
            UserTable.push(userModel);
            console.log("初始化用户信息" + userModel.toJSON())
        }
    }
}


export const userService = new UserService();