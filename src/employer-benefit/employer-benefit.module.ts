import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { BenefitSchema } from 'src/benefit/benefit.model';
import { EmployerSchema } from 'src/employer/employer.model';
import { UserModule } from 'src/user/user.module';
import { EmployerBenefitController } from './employer-benefit.controller';
import { EmployerBenefitSchema } from './employer-benefit.model';
import { EmployerBenefitService } from './employer-benefit.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "Benefit",
        schema: BenefitSchema
      },
      {
        name: "EmployerBenefit",
        schema: EmployerBenefitSchema
      },
      {
        name: "Employer",
        schema: EmployerSchema
      }]
    ),
    UserModule,
    AuthModule,
  ],
  controllers: [EmployerBenefitController],
  providers: [EmployerBenefitService]
})
export class EmployerBenefitModule {}
