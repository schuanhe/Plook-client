import {Request, Response} from "express";


export interface IRoomController {

    /**
     * 创建房间
     */
    createRoom(req: Request, res: Response): Promise<void>;

    /**
     * 加入房间
     */
    joinRoom(req: Request, res: Response): Promise<void>;

    /**
     * 获取房间列表
     * 获取可访问房间列表
     */
    getRoomList(req: Request, res: Response): Promise<void>;

    /**
     * 获取房间info
     * 需要是本房间的成员
     */
    getRoomInfo(req: Request, res: Response): Promise<void>;


}