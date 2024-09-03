import { request } from "./request";



export function getRoomList() {
    return request({
        url: `rooms`,
    });
}
