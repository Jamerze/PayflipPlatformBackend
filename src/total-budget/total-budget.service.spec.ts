import { Test, TestingModule } from '@nestjs/testing';
import { TotalBudgetService } from './total-budget.service';

describe('TotalBudgetService', () => {
  let service: TotalBudgetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TotalBudgetService],
    }).compile();

    service = module.get<TotalBudgetService>(TotalBudgetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
