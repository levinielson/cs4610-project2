import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChatRoomsService } from 'server/providers/services/chat_rooms.service';
import { ChatRoom } from 'server/entities/chat_room.entity';

class ChatRoomPostBody {
  xCoordinate: number;
  yCoordinate: number;
  name: string;
}

@Controller()
export class ChatRoomsController{
  constructor(
    private chatRoomsService: ChatRoomsService,
  ) {}

  @Get('/chatRooms')
  async index() {
    const chatRooms = await this.chatRoomsService.findAll()
    return { chatRooms };
  }

  @Post('/chatRooms')
  public async create(@Body() chatRoomPostBody: ChatRoomPostBody) {
    let room = new ChatRoom();
    room.roomName = chatRoomPostBody.name;
    room.xCoordinate = chatRoomPostBody.xCoordinate;
    room.yCoordinate = chatRoomPostBody.yCoordinate;
    const chatRoom = await this.chatRoomsService.save(room);
  }

}