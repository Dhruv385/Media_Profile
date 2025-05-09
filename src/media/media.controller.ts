import { Controller, Get, Query, Req, UseGuards} from "@nestjs/common";
import { MediaService } from "./media.service";

@UseGuards()
@Controller('/s3')
export class MediaController {
    constructor(private readonly mediaService: MediaService){}

    @Get('/upload-url')
    async getUploadUrl(@Query('fileName') fileName: string, @Query('fileType') fileType: string){
        if (!fileName || !fileType) {
            throw new Error('fileName and fileType are required');
        }

        const url = await this.mediaService.generatePresignedUrl(fileName, fileType);
        return {url};
    }

    @Get('/download-url')
    async getDownloadUrl(@Query('fileName') fileName: string, @Req() req): Promise<string> {
        const userId = req.userId;
        if (!fileName) {
            throw new Error('fileName is required');
        }

        const url = await this.mediaService.generateDownloadUrl(userId,fileName);
        return url;
    }
}