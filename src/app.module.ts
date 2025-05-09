import { Module } from '@nestjs/common';
import { MediaModule } from './media/media.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MediaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    MongooseModule.forRoot(process.env.DB_URI as string), 
  ],
})
export class AppModule {}
