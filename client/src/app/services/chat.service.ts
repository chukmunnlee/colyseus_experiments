import {Injectable, inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Client, getStateCallbacks, Room} from "colyseus.js";

import {ChatTextSlice, CreateChatRoom} from "../models";
import {ChatRoomData, ChatText} from "../schema";
import { ChatRoomStore } from '../services/chat.store'
import {firstValueFrom} from "rxjs";

@Injectable()
export class ChatService {

  private http = inject(HttpClient)
  private chatRoomStore = inject(ChatRoomStore)
  private client: Client
  private room!: Room<ChatRoomData>
  roomId: string | null = null

  constructor() {
    this.client = new Client('ws://localhost:3000')
  }

  hasJoined() { return !this.roomId }

  disconnect() {
    if (!!this.room)
      this.room.leave()
        .catch(() => {})
        .finally(() => {
          this.chatRoomStore.clearStore()
          this.roomId = null
        })
  }

  createRoom(roomDetail: CreateChatRoom): Promise<Room<ChatRoomData>> {
    return this.client.create<ChatRoomData>('chat', roomDetail)
        .then(room => {
          this.setup(room, roomDetail)
          return room
        })
  }


  joinRoom(roomDetail: CreateChatRoom): Promise<Room<ChatRoomData>> {
    return this.client.joinById<ChatRoomData>(roomDetail.roomName, roomDetail)
      .then(room => {
        this.setup(room, roomDetail)
        return room
      })
  }

  private setup(room: Room, roomDetail: CreateChatRoom) {
      this.room = room
      this.roomId = room.roomId

      this.room.onMessage("chat", (message: ChatText) => {
        console.info('>>> message: ', message)
      })

      this.chatRoomStore.initializeStore({
        roomId: room.roomId,
        roomName: roomDetail.roomName,
        myName: roomDetail.userName
      })

      const $ = getStateCallbacks(room)

      $(room.state).listen('userNames', (curr, prev) => {
        console.info('>>>> curr: ', curr.toArray())
        if (!!prev)
          console.info('\t>>>> prev: ', prev.toArray())
        this.chatRoomStore.updateUserNames(curr.toArray())
      })
      $(room.state).listen('messages', (_, curr) => {
        this.chatRoomStore.updateMessages(curr.toArray())
      })
  }

  send(message: string) {
    firstValueFrom(this.chatRoomStore.roomDetails$)
        .then(data => {
          const chat = {
            timestamp: 0, userName: data['userName'], message
          } as ChatTextSlice
          this.room.send("chat", chat)
        })
  }

}
