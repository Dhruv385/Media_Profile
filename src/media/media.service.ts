// src/media/media.service.ts
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Media, MediaDocument } from "./media.schema";
import { S3Service } from "../s3/s3.service";  

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media.name) private mediaModel: Model<MediaDocument>,
    private readonly s3Service: S3Service
  ) {}

  async generatePresignedUrl(fileName: string, fileType: string): Promise<string> {
    return this.s3Service.generateUploadUrl(fileName, fileType);
  }

  async generateDownloadUrl(userId: Types.ObjectId, fileName: string): Promise<string> {
    return this.s3Service.generateDownloadUrl(fileName);
  }
}
