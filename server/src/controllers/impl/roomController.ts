
import {IUserController} from "../iUserController";
import e, { Request, Response } from 'express';
import {ApiResponse} from "../../utils/apiResponse";
import {roomService} from "../../services";
import {IRoomController} from "../iRoomController";
import {RoomModel} from "../../models/Room";
import {UserModel} from "../../models/User";

class RoomController implements IRoomController {
    createRoom(req: e.Request, res: e.Response): void {
        let newRoom:RoomModel = req.body;
        if (newRoom.userId != req.body.jwtUserId){
            console.log(req.body.jwtUserId.toString())
            res.status(400).send(ApiResponse.badRequest("用户id不匹配"))
            return;
        }
        roomService.addRoom(newRoom).then(r =>
        {
            if (r == null)
                res.status(400).send(ApiResponse.badRequest("房间创建失败"))
            res.status(200).send(ApiResponse.success(r))
        }

        ).catch(err => {
                res.status(500).send(ApiResponse.error(err.message))
        })
    }

    getRoomInfo(req: e.Request, res: e.Response): void {
        const roomId = Number(req.params.id);
        if (!roomId)
            res.status(400).send(ApiResponse.badRequest("roomId is required"))
        roomService.getRoomInfo(roomId).then(r =>
            res.status(200).send(ApiResponse.success(r))
        ).catch(err => {
            res.status(500).send(ApiResponse.error(err))
        })
    }

    getRoomList(req: e.Request, res: e.Response): void {
        let reqUser:UserModel = req.body;
        roomService.getRoomList(reqUser).then(r =>
            res.status(200).send(ApiResponse.success(r))
        ).catch(err => {
            res.status(500).send(ApiResponse.error(err))
        })
    }

    joinRoom(req: e.Request, res: e.Response): void {
        let reqUserId:number = req.body.jwtUserId;
        let reqRoom:RoomModel = req.body;
        roomService.joinRoom(reqRoom, reqUserId).then(r =>
            res.status(200).send(ApiResponse.success(r))
        ).catch(err => {
            res.status(500).send(ApiResponse.error(err))
        })
    }

}

export const roomController:IRoomController = new RoomController();