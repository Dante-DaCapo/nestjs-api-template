import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  ValidationPipe,
} from "@nestjs/common";
import { PinService } from "../services/pin.service";
import { Pin } from "../entities/pin";
import { UrlDto } from "../dto/UrlDto";
import { CreatePinDto } from "../dto/CreatePinDto";
import { AuthJwt } from "src/auth/types/AuthJwtPayload";
import { Request } from "express";

@Controller("pin")
export class PinController {
  constructor(private readonly pinService: PinService) {}

  @Post("create-pin")
  async createPin(
    @Body(new ValidationPipe()) createPinDto: CreatePinDto,
    @Req() request: Request,
  ) {
    const user: AuthJwt = request["user"];
    createPinDto.userId = user.sub;
    return await this.pinService.createPin(createPinDto);
  }

  @Get("get-all-user-pins")
  async getAllUserPins(@Req() request: Request) {
    const user: AuthJwt = request["user"];
    return await this.pinService.findAllByUserId(user.sub);
  }

  @Post("extract-data-from-url")
  async extractDataFromUrl(@Body(new ValidationPipe()) urlDto: UrlDto) {
    return await this.pinService.extractDataFromUrl(urlDto.url);
  }

  @Get(":id")
  async getPinById(
    @Param("id") id: number,
    @Req() request: Request,
  ): Promise<Pin> {
    const user: AuthJwt = request["user"];
    return await this.pinService.findByIdAndUserId(id, user.sub);
  }
}
