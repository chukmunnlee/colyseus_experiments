import {Body, Controller, Post} from "@nestjs/common";
import {CreateChatRoom} from "src/models";
import {ChatService} from "src/services/chat.service";

@Controller()
export class GameController {

  constructor(private readonly chatSvc: ChatService) { }

  @Post("/game")
  createGame(@Body() payload: CreateChatRoom) {
    console.info('>>>> POST: ', payload)
    console.info('>>>> createRoom: ', this.chatSvc.createRoom(payload))
    return {}
  }
}
