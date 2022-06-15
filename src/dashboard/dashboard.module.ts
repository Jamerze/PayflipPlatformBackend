import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { BenefitSchema } from 'src/benefit/benefit.model';
import { BudgetSchema } from 'src/budget/budget.model';
import { EmployeeBenefitSchema } from 'src/employee-benefit/employee-benefit.model';
import { EmployeeSchema } from 'src/employee/employee.model';
import { EmployerBenefitSchema } from 'src/employer-benefit/employer-benefit.model';
import { EmployerSchema } from 'src/employer/employer.model';
import { EmployerModule } from 'src/employer/employer.module';
import { TotalBudgetSchema } from 'src/total-budget/total-budget.model';
import { UserSchema } from 'src/user/user.model';
import { UserModule } from 'src/user/user.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "Employer",
        schema: EmployerSchema
      },
      {
        name: "User",
        schema: UserSchema
      },
      {
        name: "Employee",
        schema: EmployeeSchema
      },
      {
        name: "Benefit",
        schema: BenefitSchema
      },
      {
        name: "EmployerBenefit",
        schema: EmployerBenefitSchema
      },
      {
        name: "Budget",
        schema: BudgetSchema
      },
      {
        name: "EmployeeBenefit",
        schema: EmployeeBenefitSchema
      },
      {
        name: "TotalBudget",
        schema: TotalBudgetSchema
      }]
    ),
    AuthModule,
    UserModule,
    EmployerModule
  ],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
