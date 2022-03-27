import { Module } from '@nestjs/common';
import { EmployerController } from './employer.controller';
import { EmployerService } from './employer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployerSchema } from './employer.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "Employer",
        schema: EmployerSchema
      }]
    )
  ],
  controllers: [EmployerController],
  providers: [EmployerService]
})
export class EmployerModule {}
