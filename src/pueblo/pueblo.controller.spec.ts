import { Test, TestingModule } from '@nestjs/testing';
import { PuebloController } from './pueblo.controller';
import { PuebloService } from './pueblo.service';

describe('PuebloController', () => {
  let controller: PuebloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PuebloController],
      providers: [PuebloService],
    }).compile();

    controller = module.get<PuebloController>(PuebloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
