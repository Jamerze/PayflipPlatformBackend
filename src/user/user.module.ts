import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployerSchema } from 'src/employer/employer.model';
import { UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "User",
        schema: UserSchema
      },
      {
        name: "Employer",
        schema: EmployerSchema
      }]
    )
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
