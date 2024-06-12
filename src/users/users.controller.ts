import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create-user')
  async createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @Get(':id')
  async getConnectedUser(@Param('id') id: number) {
    await this.usersService.findById(id);
  }
}
