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
import { AuthJwt } from "src/auth/decorators/types/AuthJwtPayload";

@Controller("pin")
export class PinController {
  constructor(private readonly pinService: PinService) {}

  @Get(":id")
  async getPinById(@Param("id") id: number): Promise<Pin> {
    return await this.pinService.findById(id);
  }

  @Post("create-pin")
  async createPin(
    @Body(new ValidationPipe()) createPinDto: CreatePinDto,
    @Req() request: Request,
  ) {
    const user: AuthJwt = request["user"];
    createPinDto.userId = user.sub;
    return await this.pinService.createPin(createPinDto);
  }

  @Post("extract-data-from-url")
  async extractDataFromUrl(@Body(new ValidationPipe()) urlDto: UrlDto) {
    return await this.pinService.extractDataFromUrl(urlDto.url);
  }
}
