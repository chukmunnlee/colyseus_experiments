import {Client, Room} from "colyseus";
import {ChatRoomData, ChatText} from "src/schema";
import {ulid} from "ulid";

export class ChatRoom extends Room<ChatRoomData> {

  state = new ChatRoomData()
  //state: ChatRoomData = new ChatRoomData()

  onCreate(options: any): void | Promise<any> {
    console.info('>>> on create:', options)
    this.state.roomId = this.roomId
    this.state.roomName = options['roomName'] ?? ulid()
    this.state.historySize = 0

    this.onMessage("chat", (client, message) => {
      const ct = new ChatText()
      ct.assign({
        timestamp: Date.now(),
        userName: client.userData.userName,
        message: message.text
      })
      this.state.messages.push(ct)
    })
  }

  onJoin(client: Client<any, any>, options?: any, auth?: any): void | Promise<any> {
    client.userData = { userName: options['userName'] }
    this.state.userNames.push(options['userName'])
  }

  onDispose(): void | Promise<any> {
    console.info('>>> removing room: ', this.state.roomName)
  }

  onUncaughtException(error: Error, method: string) {
    console.error('>>> method: ', method)
    console.error('>>> error: ', error)
  }

}
