import { NestFactory } from '@nestjs/core';
import {ExpressAdapter} from '@nestjs/platform-express';

import * as express from 'express'
import * as http from 'http'

import {Server} from 'colyseus';
import {WebSocketTransport} from '@colyseus/ws-transport';
import { playground } from '@colyseus/playground'

import { AppModule } from './app.module';
import {monitor} from '@colyseus/monitor';

export let COLY_SERVER: Server

async function bootstrap() {

  const expApp = express()

  const httpServer = http.createServer(expApp)

  const colyServer = new Server({
    transport: new WebSocketTransport({
      server: httpServer
    })
  })

  COLY_SERVER = colyServer

  expApp.use('/playground', playground())
  expApp.use('/monitor', monitor())

  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expApp));
  nestApp.enableCors()
  nestApp.init()

  // @ts-ignore
  const port: number = parseInt(process.env.PORT) || 3000
  await colyServer.listen(port)

  console.info(`Server started on port ${port} at ${new Date()}`)
}

bootstrap();
