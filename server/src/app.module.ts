import { Module } from '@nestjs/common';
import {GameController} from './controllers/game.controller';
import {ChatService} from './services/chat.service';
import {COLY_SERVER} from './main';

@Module({
  imports: [],
  controllers: [ GameController ],
  providers: [
    {
      provide: ChatService,
      useFactory: () => new ChatService(COLY_SERVER)
    }
  ],
})
export class AppModule {}
