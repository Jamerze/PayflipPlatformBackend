import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { EmployeeSchema } from 'src/employee/employee.model';
import { EmployerSchema } from 'src/employer/employer.model';
import { TotalBudgetSchema } from 'src/total-budget/total-budget.model';
import { UserSchema } from 'src/user/user.model';
import { UserModule } from 'src/user/user.module';
import { BudgetController } from './budget.controller';
import { BudgetSchema } from './budget.model';
import { BudgetService } from './budget.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "Employee",
        schema: EmployeeSchema
      },
      {
        name: "Employer",
        schema: EmployerSchema
      },
      {
        name: "Budget",
        schema: BudgetSchema
      },
      {
        name: "TotalBudget",
        schema: TotalBudgetSchema
      },
      {
        name: "User",
        schema: UserSchema
      }]
    )
  ],
  controllers: [BudgetController],
  providers: [BudgetService]
})
export class BudgetModule {}
