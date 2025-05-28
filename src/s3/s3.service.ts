// src/aws/s3.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.configService.get<string>('AWS_BUCKET_NAME')!;

    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION')!,
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID')!,
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY')!,
      },
    });
  }

  async generateUploadUrl(fileName: string, fileType: string): Promise<string> {
    try{
        const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        ContentType: fileType,
        });

        return await getSignedUrl(this.s3Client, command, { expiresIn: 300 });
    }
    catch(err){
        return err;
    }
  }

  async generateDownloadUrl(fileName: string): Promise<string> {
    try{
        const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        });

        return await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
    }
    catch(err){
        return err;
    }
  }
}
