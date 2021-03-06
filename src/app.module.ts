import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EmployerModule } from './employer/employer.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { EmployeeModule } from './employee/employee.module';
import { BenefitModule } from './benefit/benefit.module';
import { EmployerBenefitModule } from './employer-benefit/employer-benefit.module';
import { BudgetModule } from './budget/budget.module';
import { EmployeeBenefitModule } from './employee-benefit/employee-benefit.module';
import { TotalBudgetModule } from './total-budget/total-budget.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://payflipmobility:BlendedDatabaseAccount_2022@payflipcluster.nrost.mongodb.net/payflipdb?retryWrites=true&w=majority'),
    UserModule,
    AuthModule,
    EmployerModule,
    DashboardModule,
    EmployeeModule,
    BenefitModule,
    EmployerBenefitModule,
    BudgetModule,
    EmployeeBenefitModule,
    TotalBudgetModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
