import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GatewayAuthGuard } from '../guards/gatewayauth.guard';
import { UseGuards } from '@nestjs/common';
import { JwtService } from '../services/jwt.service';

class chatMessagePayload {
  contents: string;
  userName: string;
  id: number;
}


@WebSocketGateway()
@UseGuards(GatewayAuthGuard)
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private jwtService: JwtService) {}

  handleConnection(client: any, ...args: any[]) {
    try {
      const jwt = client.handshake.auth.token;
      this.jwtService.parseToken(jwt);
      client.join(client.handshake.query.chatRoomId as unknown as string);
    }
    catch (e) {
      throw new WsException("Invalid token");
    }
  }

  handleDisconnect(client: any) {
    console.log("Client disconnected");
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: chatMessagePayload) {
    const contents = payload.contents;
    const sender = payload.userName;
    const id = payload.id;
    this.server.to(`${client.handshake.query.chatRoomId}`).emit('message', {contents, sender, id})
  }



}