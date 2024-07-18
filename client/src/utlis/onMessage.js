import { useRoomStore } from "../store/room";

export function onRoomInfo(message) {
    // console.log(message);
}

export function onRoomMessage(message) {
    const roomStore = useRoomStore()
    roomStore.addMsg(message)
}
