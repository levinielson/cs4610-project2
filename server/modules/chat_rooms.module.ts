import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from '../entities/chat_room.entity';
import { ChatRoomsService } from '../providers/services/chat_rooms.service';
import { ChatRoomsController } from '../controllers/chat_rooms.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom])],
  controllers: [ChatRoomsController],
  providers: [ChatRoomsService],
  exports: []

})
export class ChatRoomsModule {}