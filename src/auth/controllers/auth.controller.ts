import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { SignInDto } from "../DTOs/signInDto";
import { Public } from "../decorators/PublicDecorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  @Public()
  signIn(@Body(new ValidationPipe()) signInDto: SignInDto) {
    console.log(signInDto);
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
