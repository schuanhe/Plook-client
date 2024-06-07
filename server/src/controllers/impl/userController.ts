
import {IUserController} from "../iUserController";
import e, { Request, Response } from 'express';
import {userService} from "../../services";
import {ApiResponse} from "../../utils/apiResponse";
import user, {UserInstance, UserModel} from "../../models/User";

class UserController implements IUserController {

    register(req: Request, res: Response): void {
        let newUser: UserInstance = req.body;
        if (!newUser.username || !newUser.email || !newUser.password) {
            res.status(400).send(ApiResponse.badRequest("缺少必要参数"));
            return;
        }
        userService.getUserInfoByName(newUser).then(user => {
            if (user) {
                res.status(400).send(ApiResponse.error("用户名已存在"));
                return;
            }
            userService.addUser(newUser).then(user => {
                res.status(200).send(ApiResponse.success("添加成功"+user.username));
            }).catch(err => {
                res.status(500).send(ApiResponse.error(err));
            });
        }).catch(err => {
            res.status(500).send(ApiResponse.error(err));
        })
    }

    login(req: e.Request, res: e.Response): void {
        let reqUser: UserInstance = req.body;
        if (!reqUser.username || !reqUser.password){
            res.status(400).send(ApiResponse.badRequest("缺少必要参数"));
            return;
        }
        userService.getUserInfoByNameAndPassword(reqUser).then(user => {
            if (user) {
                res.status(200).send(ApiResponse.success(user));
            } else {
                res.status(404).send(ApiResponse.notFound("账号或密码错误"));
            }
        }).catch(err => {
            res.status(500).send(ApiResponse.error(err));
        })
    }

    getUserInfo(req: e.Request, res: e.Response): void {
        let reqUser: UserInstance = req.body;
        userService.getUserInfo(reqUser).then(user => {
            if (user) {
                res.status(200).send(ApiResponse.success(user));
            } else {
                res.status(404).send(ApiResponse.notFound("用户不存在"));
            }
        }).catch(err => {
            res.status(500).send(ApiResponse.error(err));
        });

    }

}

export const userController = new UserController();