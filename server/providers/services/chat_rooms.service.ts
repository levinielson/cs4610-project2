import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from 'server/entities/chat_room.entity';

@Injectable()
export class ChatRoomsService {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomsRepository: Repository<ChatRoom>,
  ) {}

  findAll(relations: string[] = []) {
    console.log("error here")
    return this.chatRoomsRepository.find({ relations });
  }

  save(room: ChatRoom): Promise<ChatRoom> {
    return this.chatRoomsRepository.save(room);
  }
}