import {Injectable, inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Client, getStateCallbacks, Room} from "colyseus.js";

import {ChatTextSlice, CreateChatRoom} from "../models";
import {ChatRoomData, ChatText} from "../schema";
import { ChatRoomStore } from '../services/chat.store'

@Injectable()
export class ChatService {

  private http = inject(HttpClient)
  private chatRoomStore = inject(ChatRoomStore)
  private client: Client
  private room!: Room<ChatRoomData>

  private userNamesCB!: () => void
  private messagesCB!: () => void

  protected roomId: string | null = null
  protected _userName!: string
  get userName() { return this._userName }

  constructor() {
    this.client = new Client('ws://localhost:3000')
  }

  hasJoined() { return !this.roomId }

  disconnect() {
    if (!!this.room) {
      this.userNamesCB()
      this.messagesCB()
      this.room.leave()
        .catch(() => {})
        .finally(() => {
          this.chatRoomStore.clearStore()
          this.roomId = null
        })
    }
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
    this._userName = roomDetail.userName

    this.room.onMessage("chat", (message: ChatText) => {
      console.info('>>> message: ', message)
    })

    this.chatRoomStore.initializeStore({
      roomId: room.roomId,
      roomName: roomDetail.roomName,
      myName: roomDetail.userName
    })

    const $ = getStateCallbacks(room)

    this.userNamesCB = $(room.state).listen('userNames', (curr) => {
      this.chatRoomStore.updateUserNames(curr.toArray())
    })
    this.messagesCB = $(room.state).listen('messages', (curr) => {
      this.chatRoomStore.updateMessages(curr.toArray())
    })
  }

  send(message: string) {
    this.room.send("chat", message)
  }

}
