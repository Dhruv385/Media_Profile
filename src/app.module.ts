import { Module } from '@nestjs/common';
import { MediaModule } from './media/media.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    MediaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    MongooseModule.forRoot(process.env.DB_URI as string), 
    S3Module,
  ],
})
export class AppModule {}
