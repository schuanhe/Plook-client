// userService.js
import {UserInstance, UserModel} from '../../models/User';
import {userTable} from '../../utils/noDBUtil';
import {IUserService} from "./iUserService";



export class UserService implements IUserService{
    getUserInfo(user:UserModel) {
        if (!user?.id)
            return Promise.reject("id不能为空")
        const CUser = userTable.find(userOld => userOld.id === user.id);
        if (CUser) {
            return Promise.resolve(CUser);
        }
        return Promise.reject("用户不存在");
    }
    getUserInfoByName(user: UserModel) {
        const userModel = new UserModel;
        if (!user.username)
            return Promise.reject("用户名不能为空")
        const CUser = userTable.find(userOld => userOld.username === user.username);
        if (CUser){
            return Promise.resolve(CUser);
        }
        return Promise.reject("用户不存在");
    }
    getUserList() {
        return Promise.resolve(userTable);
    }

    addUser(user:UserModel){
        const userModel = new UserModel;
        if (!user.username || !user.email)
            return Promise.reject("用户名或邮箱不能为空");
        if (userTable.find(userOld => userOld.username === user.username)){
            return Promise.reject("用户名已存在");
        }

        userModel.id = userTable.length + 1
        userModel.username = user.username
        userModel.email = user.email
        userTable.push(userModel);

        return Promise.resolve(userModel);
    }

    init(){
        if (userTable.length === 0){
            const userModel:UserInstance = new UserModel;
            userModel.id = 1;
            userModel.username = "admin";
            userModel.email = "admin@admin.com";
            this.addUser(userModel).then(() => {
                console.log("初始化用户信息" + JSON.stringify(userModel))
            })
        }
    }
}


export const userService = new UserService();