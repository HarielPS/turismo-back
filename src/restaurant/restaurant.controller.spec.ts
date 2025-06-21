import { Test, TestingModule } from '@nestjs/testing';
import { RestauranteController } from './restaurant.controller';
import { RestauranteService } from './restaurant.service';

describe('RestaurantController', () => {
  let controller: RestauranteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestauranteController],
      providers: [RestauranteService],
    }).compile();

    controller = module.get<RestauranteController>(RestauranteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
