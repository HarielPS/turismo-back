import { Test, TestingModule } from '@nestjs/testing';
import { PuebloService } from './pueblo.service';

describe('PuebloService', () => {
  let service: PuebloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuebloService],
    }).compile();

    service = module.get<PuebloService>(PuebloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
