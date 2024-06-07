import {Request, Response} from "express";


export interface IUserController {

    /**
     * 注册
     */
    register(req: Request, res: Response) : void;

    /**
     * 登录
     */
    login(req: Request, res: Response) : void;

    /**
     * 查询用户基本信息
     */
    getUserInfo(req: Request, res: Response) : void;


}