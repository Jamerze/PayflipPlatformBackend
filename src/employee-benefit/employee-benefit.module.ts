import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BenefitSchema } from 'src/benefit/benefit.model';
import { EmployeeSchema } from 'src/employee/employee.model';
import { EmployerBenefitSchema } from 'src/employer-benefit/employer-benefit.model';
import { TotalBudgetSchema } from 'src/total-budget/total-budget.model';
import { EmployeeBenefitController } from './employee-benefit.controller';
import { EmployeeBenefitSchema } from './employee-benefit.model';
import { EmployeeBenefitService } from './employee-benefit.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "Employee",
        schema: EmployeeSchema
      },
      {
        name: "Benefit",
        schema: BenefitSchema
      },
      {
        name: "EmployeeBenefit",
        schema: EmployeeBenefitSchema
      },
      {
        name: "EmployerBenefit",
        schema: EmployerBenefitSchema
      },
      {
        name: "TotalBudget",
        schema: TotalBudgetSchema
      }]
    )
  ],
  controllers: [EmployeeBenefitController],
  providers: [EmployeeBenefitService]
})
export class EmployeeBenefitModule {}
