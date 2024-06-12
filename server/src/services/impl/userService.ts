import User, {UserModel} from '../../models/User';
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
        return User.findAll({
            attributes: ['id', 'username', 'email']
        });
    }

    async addUser(user: UserModel): Promise<UserModel> {
        if (!user.username || !user.email) {
            return Promise.reject('用户名或邮箱不能为空');
        }
        // 创建新的用户对象
        let CUser: UserModel = new UserModel();
        CUser.username = user.username;
        try {
            // 获取用户名信息，检查是否已存在
            const existingUser = await this.getUserInfoByName(CUser);
            if (existingUser) {
                return Promise.reject('用户名已存在');
            }
            // 创建新用户
            return await User.create({
                username: user.username,
                email: user.email
            });
        } catch (error) {
            return Promise.reject('添加用户时发生意外错误');
        }
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
