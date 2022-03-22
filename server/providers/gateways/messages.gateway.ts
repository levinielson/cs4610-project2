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

@WebSocketGateway()
@UseGuards(GatewayAuthGuard)
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private jwtService: JwtService) {}

  handleConnection(client: any, ...args: any[]) {
    try {
      const jwt = client.handshake.auth.token;
      this.jwtService.parseToken(jwt);
      client.join(client.handshake.query.chatRoomId as unknown as string)
    }
    catch (e) {
      throw new WsException("Invalid token");
    }
  }

  
}