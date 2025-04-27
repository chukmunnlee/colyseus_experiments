import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {ChatRoomSlice, ChatTextSlice} from "../models";
import {ChatText} from "../schema";

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

  readonly clearStore = () => {
    this.setState(INIT_STATE)
  }

  readonly updateUserNames = this.updater<string[]>(
    (slice: ChatRoomSlice, userNames: string[]) => ({ ...slice, userNames })
  )

  readonly updateMessages = this.updater<ChatText[]>(
    (slice: ChatRoomSlice, messages: ChatText[]) => ({ ...slice, messages })
  )

  readonly roomDetails$ = this.select<PropertyValue>(
    (slice: ChatRoomSlice) => ({
      roomId: slice.roomId, roomName: slice.roomName, myName: slice.myName
    })
  )

  readonly userNames$ = this.select<string[]>(
    (slice: ChatRoomSlice) => slice.userNames
  )

  readonly messages$ = this.select<ChatTextSlice[]>(
    (slice: ChatRoomSlice) => slice.messages
  )
}
