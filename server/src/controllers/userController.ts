
import {IUserController} from "./iUserController";
import { Request, Response } from 'express';
import {userService} from "../services";
import {ApiResponse} from "../utils/apiResponse";
import {UserInstance, UserModel} from "../models/User";

class UserController implements IUserController {

    public async addUser(req: Request, res: Response): Promise<void> {
        let newUser: UserInstance = req.body;
        if (!newUser.username || !newUser.email) {
            res.status(400).send(ApiResponse.badRequest("参数错误"));
            return;
        }

        let user = await userService.getUserInfoByName(newUser)
        if (user) {
            res.status(400).send(ApiResponse.error("用户名已存在"));
            return;
        }

        userService.addUser(req.body).then(user => {
            res.status(200).send(ApiResponse.success("添加成功"+user.username));
        }).catch(err => {
            res.status(500).send(ApiResponse.error(err));
        });
    }
}

export const userController = new UserController();