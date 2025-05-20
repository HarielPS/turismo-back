import { Injectable } from '@nestjs/common';
import { CreatePuebloDto } from './dto/create-pueblo.dto';
import { UpdatePuebloDto } from './dto/update-pueblo.dto';

@Injectable()
export class PuebloService {
  create(createPuebloDto: CreatePuebloDto) {
    return 'This action adds a new pueblo';
  }

  findAll() {
    return `This action returns all pueblo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pueblo`;
  }

  update(id: number, updatePuebloDto: UpdatePuebloDto) {
    return `This action updates a #${id} pueblo`;
  }

  remove(id: number) {
    return `This action removes a #${id} pueblo`;
  }
}
