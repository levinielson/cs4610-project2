import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from '../entities/chat_room.entity';
import { ChatRoomsService } from '../providers/services/chat_rooms.service';
import { ChatRoomsController } from '../controllers/chat_rooms.controller';
import { MessagesGateway } from 'server/providers/gateways/messages.gateway';
import { JwtService } from 'server/providers/services/jwt.service';
import { GuardUtil } from 'server/providers/util/guard.util';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom])],
  controllers: [ChatRoomsController],
  providers: [ChatRoomsService, MessagesGateway, JwtService, GuardUtil],
  exports: []

})
export class ChatRoomsModule {}