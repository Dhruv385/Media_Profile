import { Module } from "@nestjs/common";
import { MediaController } from "./media.controller";
import { MediaService } from "./media.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Media, mediaSchema } from "./media.schema";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Media.name, schema: mediaSchema }]),
        // MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]),
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [MediaController],
    providers: [MediaService]
})

export class MediaModule{}