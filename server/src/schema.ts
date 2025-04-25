import { ArraySchema, Schema, type } from '@colyseus/schema'

export class ChatText extends Schema {
  @type("number") timestamp: number
  @type("string") userName: string
  @type("string") message: string
}

export class ChatRoomData extends Schema {
  @type("string") roomId: string
  @type("string") roomName: string
  @type("number") historySize: number
  @type([ "string" ]) userNames = new ArraySchema<string>()
  @type([ ChatText ]) messages = new ArraySchema<ChatText>()
}
