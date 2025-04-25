import {Injectable, OnModuleInit} from "@nestjs/common";
import {Server} from "colyseus";
import {CreateChatRoom} from "src/models";
import {ChatRoom} from "src/rooms/chatroom";

@Injectable()
export class ChatService implements OnModuleInit {

  constructor(private readonly colyseus: Server) { }

  createRoom(payload: CreateChatRoom) {
    console.info('>>>> colyseus: ', this.colyseus)
  }

  onModuleInit() {
    this.colyseus.define('chat', ChatRoom)
  }
}
