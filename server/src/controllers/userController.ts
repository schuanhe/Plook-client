
import {IUserController} from "./iUserController";
import { Request, Response } from 'express';
import {userService} from "../services";

class UserController implements IUserController {

    public addUser(req: Request, res: Response): void {

        userService.init()
    }
}

export const userController = new UserController();