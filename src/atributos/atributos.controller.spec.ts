import { Test, TestingModule } from '@nestjs/testing';
import { AtributosController } from './atributos.controller';

describe('AtributosController', () => {
  let controller: AtributosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtributosController],
    }).compile();

    controller = module.get<AtributosController>(AtributosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
