import { Module } from '@nestjs/common';
import { PuebloService } from './pueblo.service';
import { PuebloController } from './pueblo.controller';

@Module({
  controllers: [PuebloController],
  providers: [PuebloService],
})
export class PuebloModule {}
