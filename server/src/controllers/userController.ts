// src/controllers/userController.js
// const userService = require('../services').userService;
// const {userService} = require('../services/index');
import {IUserController} from "./iUserController";
import { Request, Response } from 'express';
import {userService} from "../services/user/userService";

class UserController implements IUserController {

    public addUser(req: Request, res: Response): void {

        userService.init()
    }
}

export const userController = new UserController();