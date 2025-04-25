import {Client, Room} from "colyseus";
import {ChatRoomData} from "src/schema";

export class ChatRoom extends Room<ChatRoomData> {

  state = new ChatRoomData()

  onCreate(options: any): void | Promise<any> {
    console.info('>>> on create:', options)
    this.onMessage("chat", (client, message) => {
      console.info(`Message from ${client.userData['userName']}: `, message)
      this.state.messages.push({ ...message, timestamp: Date.now() })
    })
  }

  onJoin(client: Client<any, any>, options?: any, auth?: any): void | Promise<any> {
    console.info('>>> on join:', options)
    client.userData = { userName: options['userName'] }
    this.state.roomId = this.roomId
    this.state.roomName = options['roomName']
    this.state.userNames.push(options['userName'])
    this.state.historySize = 0
    console.info('>>> exiting...')
  }
}
