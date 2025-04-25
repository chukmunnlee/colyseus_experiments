import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {ChatRoomSlice} from "../models";

const INIT_STATE: ChatRoomSlice = {
  roomId: "",
  roomName: "",
  myName: "",
  userNames: [],
  messages: []
}

export type PropertyValue = { [ attr: string ]: string | number | boolean }

@Injectable()
export class ChatRoomStore extends ComponentStore<ChatRoomSlice> {

  constructor() { super(INIT_STATE) }

  readonly initializeStore = (data: PropertyValue) => {
    const { roomId, roomName, myName } = data
    this.setState({ roomId, roomName, myName, userNames: [ myName ], messages: [] } as ChatRoomSlice)
  }

  readonly getRoomDetails$ = this.select<PropertyValue>(
    (slice: ChatRoomSlice) => ({
      roomId: slice.roomId, roomName: slice.roomName, myName: slice.myName
    })
  )
}
