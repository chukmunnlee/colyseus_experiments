export interface CreateChatRoom {
  userName: string
  roomName: string
}

export interface ChatTextSlice {
  timestamp: number
  userName: string
  message: string
}

export interface ChatRoomSlice {
  roomId: string
  roomName: string
  myName: string
  userNames: string[]
  messages: ChatTextSlice[]
}
