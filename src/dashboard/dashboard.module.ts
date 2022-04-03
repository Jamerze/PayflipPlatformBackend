import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { EmployerSchema } from 'src/employer/employer.model';
import { EmployerModule } from 'src/employer/employer.module';
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
