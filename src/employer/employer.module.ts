import { Module } from '@nestjs/common';
import { EmployerController } from './employer.controller';
import { EmployerService } from './employer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployerSchema } from './employer.model';
import { UserSchema } from 'src/user/user.model';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

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
    UserModule,
    AuthModule,
  ],
  controllers: [EmployerController],
  providers: [EmployerService]
})
export class EmployerModule {}
