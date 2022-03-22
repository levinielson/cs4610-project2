import { Controller, Get, Post } from '@nestjs/common'
import { ChatRoomsService } from 'server/providers/services/chat_rooms.service';

@Controller()
export class ChatRoomsController{
  constructor(
    private chatRoomsService: ChatRoomsService
  ) {}

  async findAll() {
    const chatRooms = await this.chatRoomsService.findAll()
    return { chatRooms }
  }

}