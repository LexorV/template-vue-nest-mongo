import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './resources/users/users.module';
import * as dotenv from 'dotenv';
import configs from './config/config';
import { ConfigModule } from '@nestjs/config';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(configs().database.dbUri, {
      dbName: configs().database.databaseName,
      auth: {
        username: configs().database.username,
        password: configs().database.password,
      },
    }),
    UsersModule,
    ConfigModule.forRoot({
      load: [configs],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
