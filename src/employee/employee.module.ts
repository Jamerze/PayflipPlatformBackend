import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { EmployerSchema } from 'src/employer/employer.model';
import { EmployerModule } from 'src/employer/employer.module';
import { UserSchema } from 'src/user/user.model';
import { UserModule } from 'src/user/user.module';
import { EmployeeController } from './employee.controller';
import { EmployeeSchema } from './employee.model';
import { EmployeeService } from './employee.service';

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
        name: "User",
        schema: UserSchema
      }]
    ),
    UserModule,
    AuthModule,
    EmployerModule
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule {}
