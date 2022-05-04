import { Test, TestingModule } from '@nestjs/testing';
import { EmployerBenefitService } from './employer-benefit.service';

describe('EmployerBenefitService', () => {
  let service: EmployerBenefitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployerBenefitService],
    }).compile();

    service = module.get<EmployerBenefitService>(EmployerBenefitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
