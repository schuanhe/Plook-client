import {Request, Response} from "express";


export interface IUserController {
    /**
     */
    addUser(req: Request, res: Response) : void;

}