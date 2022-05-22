import { Test, TestingModule } from '@nestjs/testing';
import { TotalBudgetController } from './total-budget.controller';

describe('TotalBudgetController', () => {
  let controller: TotalBudgetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TotalBudgetController],
    }).compile();

    controller = module.get<TotalBudgetController>(TotalBudgetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
