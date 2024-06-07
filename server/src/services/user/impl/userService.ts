import User, {UserInstance, UserModel} from '../../../models/User';
import {IUserService} from "../iUserService";


class UserService implements IUserService {
    getUserInfo(user: UserModel) {
        return User.findOne({
            where: {
                id: user.id
            },
            attributes: ['id', 'username', 'email'] // 仅包含想要返回的字段
        });
    }

    getUserInfoByName(user: UserModel) {
        return User.findOne({
            where: {
                username: user.username
            },
            attributes: ['id', 'username', 'email']
        });
    }

    getUserInfoByNameAndPassword(user: UserModel){
        return User.findOne({
            where: {
                username: user.username,
                password: user.password
            },
            attributes: ['id', 'username', 'email']
        });
    }

    getUserList() {
        return User.findAll();
    }

    addUser(user: UserModel) {
        if (!user.username || !user.email)
            return Promise.reject('用户名或邮箱不能为空');
        let CUser: UserModel = new UserModel()
        CUser.username = user.username;
        this.getUserInfoByName(CUser)
            .then(r => {
                if (r) {
                    return Promise.reject('用户名已存在');
                }
            });

        return User.create({
            username: user.username,
            email: user.email
        });
    }

    init() {
        try {
            User.sync().then(r =>
                this.getUserList().then(
                    users => {
                        if (users.length === 0) {
                            User.create({
                                username: 'admin',
                                email: 'admin@example.com'
                            }).then(
                                user => {
                                    console.log("添加默认用户成功:" + user.toJSON());
                                }
                            )
                        }
                    })
            );
        } catch (error) {
            console.error('初始化失败:', error);
        }
    }

}

export const userService = new UserService;

