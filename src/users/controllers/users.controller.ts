import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from "@nestjs/common";
import { CreateUserDto } from "../dto/createUser.dto";
import { UsersService } from "../services/users.service";
import { Public } from "src/auth/decorators/PublicDecorator";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("create-user")
  @Public()
  async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @Get(":id")
  async getConnectedUser(@Param("id") id: number) {
    await this.usersService.findById(id);
  }
}
