import { Test, TestingModule } from '@nestjs/testing';
import { EmployerBenefitController } from './employer-benefit.controller';

describe('EmployerBenefitController', () => {
  let controller: EmployerBenefitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployerBenefitController],
    }).compile();

    controller = module.get<EmployerBenefitController>(EmployerBenefitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
