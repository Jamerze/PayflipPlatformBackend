import { Module } from '@nestjs/common';
import { BenefitService } from './benefit.service';
import { BenefitController } from './benefit.controller';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BenefitSchema } from './benefit.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "Benefit",
        schema: BenefitSchema
      }]
    ),
    UserModule,
    AuthModule,
  ],
  providers: [BenefitService],
  controllers: [BenefitController]
})
export class BenefitModule { }
