import { ArraySchema, Schema, type } from '@colyseus/schema'

export class ChatText extends Schema {

  @type("number") timestamp: number = 0
  @type("string") userName: string = ""
  @type("string") message: string = ""
}

export class ChatRoomData extends Schema {

  @type("string") roomId: string = ""
  @type("string") roomName: string = ""
  @type("number") historySize: number = 0
  @type([ "string" ]) userNames: ArraySchema<string>  = new ArraySchema<string>()
  @type([ ChatText ]) messages: ArraySchema<ChatText> = new ArraySchema<ChatText>()

  addUser(userName: string) {
    this.userNames = new ArraySchema<string>(...this.userNames, userName)
  }
  removeUser(userName: string) {
    const filtered: string[] = this.userNames.filter(ct => userName != ct)
    this.userNames = new ArraySchema<string>(...filtered)
  }

  newMessage(userName: string, message: string) {
    const ct = new ChatText()
    ct.assign({
      timestamp: Date.now(),
      userName: userName,
      message: message
    })
    this.messages = new ArraySchema<ChatText>(ct, ...this.messages)
  }

}
