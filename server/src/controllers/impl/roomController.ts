
import {IUserController} from "../iUserController";
import e, { Request, Response } from 'express';
import {ApiResponse} from "../../utils/apiResponse";
import {IRoomController} from "../iRoomController";

class RoomController implements IRoomController {
    createRoom(req: e.Request, res: e.Response): Promise<void> {
        return Promise.resolve(undefined);
    }

    getRoomInfo(req: e.Request, res: e.Response): Promise<void> {
        return Promise.resolve(undefined);
    }

    getRoomList(req: e.Request, res: e.Response): Promise<void> {
        return Promise.resolve(undefined);
    }

    joinRoom(req: e.Request, res: e.Response): Promise<void> {
        return Promise.resolve(undefined);
    }

}