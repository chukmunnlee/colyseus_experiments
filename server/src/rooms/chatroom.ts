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
      this.state.newMessage(client.userData.userName, message.text)
    })
  }

  onJoin(client: Client<any, any>, options?: any, auth?: any): void | Promise<any> {
    let { userName } = options
    client.userData = { userName }
    console.info(`JOINED: ${userName} joined ${this.roomId}`)
    this.state.addUser(userName)
    this.state.newMessage(client.userData.userName, `${userName} joined the conversation`)
  }

  onLeave(client: Client<any, any>, consented?: boolean): void | Promise<any> {
    let userName = client.userData['userName']
    console.info(`LEFT: ${userName} joined ${this.roomId}`)
    this.state.removeUser(userName)
    this.state.newMessage(client.userData.userName, `${userName} left the conversation`)
  }

  onDispose(): void | Promise<any> {
    console.info('>>> removing room: ', this.state.roomName)
  }

  onUncaughtException(error: Error, method: string) {
    console.error('>>> method: ', method)
    console.error('>>> error: ', error)
  }

}
