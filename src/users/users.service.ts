import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async softDelete(id: number): Promise<void> {
    await this.usersRepository.softDelete({ id });
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete({ id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);
    const user: User = new User({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hash,
    });

    return this.usersRepository.save(user);
  }
}
