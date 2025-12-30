import type { ClientToServerEvents, ServerToClientEvents } from "@/types/socket"
import {io, Socket} from "socket.io-client"
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:5000", {
    autoConnect:false,
    transports:["websocket"],
    auth:{
        token: localStorage.getItem("accessToken")
    }
})