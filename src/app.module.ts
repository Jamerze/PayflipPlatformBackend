import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EmployerModule } from './employer/employer.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://payflipmobility:BlendedDatabaseAccount_2022@payflipcluster.nrost.mongodb.net/payflipdb?retryWrites=true&w=majority'),
    UserModule,
    AuthModule,
    EmployerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
