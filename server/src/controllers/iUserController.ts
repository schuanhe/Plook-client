import {Application, NextFunction, Request, Response} from "express";


export interface IUserController {
    /**
     */
    addUser(req: Request, res: Response) : void;

}