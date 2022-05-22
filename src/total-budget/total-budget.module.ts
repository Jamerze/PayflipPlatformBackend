import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema } from 'src/employee/employee.model';
import { TotalBudgetController } from './total-budget.controller';
import { TotalBudgetSchema } from './total-budget.model';
import { TotalBudgetService } from './total-budget.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "Employee",
        schema: EmployeeSchema
      },
      {
        name: "TotalBudget",
        schema: TotalBudgetSchema
      }]
    )
  ],
  controllers: [TotalBudgetController],
  providers: [TotalBudgetService]
})
export class TotalBudgetModule {}
