import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Media, MediaDocument } from "./media.schema";
import {S3Client, PutObjectCommand, GetObjectCommand} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from "@nestjs/config";


@Injectable()
export class MediaService {
    private readonly s3Client: S3Client;
    private readonly bucketName: string;

    constructor(@InjectModel(Media.name) private mediaModel: Model<MediaDocument>, private configService: ConfigService) {
        this.bucketName = this.configService.get<string>('AWS_BUCKET_NAME') as string;
        this.s3Client = new S3Client({
            region: this.configService.get<string>('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
            },
        } as object);
    }
  

    async generatePresignedUrl(fileName: string, fileType: string): Promise<string> {
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: fileName,
            ContentType: fileType,
        });

        const url = await getSignedUrl(this.s3Client, command, {
            expiresIn: 300, 
        });
        return url;
    }

    async generateDownloadUrl(userId: Types.ObjectId, fileName: string): Promise<string> {
        const command = new GetObjectCommand({
            Bucket: this.bucketName,
            Key: fileName,
        });
        const url = await getSignedUrl(this.s3Client, command, {
            expiresIn: 3600,
        });
        return url;
    }
}