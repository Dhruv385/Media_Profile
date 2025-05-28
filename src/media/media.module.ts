import { Module } from "@nestjs/common";
import { MediaController } from "./media.controller";
import { MediaService } from "./media.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Media, mediaSchema } from "./media.schema";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Media.name, schema: mediaSchema }]),
    ],
    controllers: [MediaController],
    providers: [MediaService]
})

export class MediaModule{}