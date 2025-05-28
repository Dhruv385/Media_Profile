// src/aws/aws.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Service } from './s3.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
        useFactory: (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET'),
        }),
        inject: [ConfigService],
    }),
  ],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
