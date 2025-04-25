import {Injectable, inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Client, getStateCallbacks, Room} from "colyseus.js";

import {ChatTextSlice, CreateChatRoom} from "../models";
import {ChatRoomData} from "../schema";
import { ChatRoomStore } from '../services/chat.store'
import {firstValueFrom} from "rxjs";

const URL = 'http://localhost:3000'

@Injectable()
export class GameService {

  private http = inject(HttpClient)
  private chatRoomStore = inject(ChatRoomStore)
  private client: Client
  private room!: Room<ChatRoomData>

  constructor() {
    this.client = new Client('ws://localhost:3000')
  }

  createRoom(roomDetail: CreateChatRoom): Promise<Room<ChatRoomData>> {
    return this.client.create<ChatRoomData>('chat', roomDetail)
        .then(room => {
          this.room = room
          const $ = getStateCallbacks(room)
          /*
          $(room.state).listen('userNames', (curr) => {
            console.info('>>> new user ', curr)
          })
          $(room.state).listen('messages', (curr) => {
            console.info('>>> new message ', curr)
          })
          */
          console.info('room: ', room)
          this.chatRoomStore.initializeStore({
            roomId: room.roomId,
            roomName: roomDetail.roomName,
            myName: roomDetail.userName
          })
          return room
        })
  }

  send(message: string) {
    firstValueFrom(this.chatRoomStore.getRoomDetails$)
        .then(data => {
          const chat = {
            timestamp: 0, userName: data['userName'], message
          } as ChatTextSlice
          this.room.send("chat", chat)
        })
  }

}
