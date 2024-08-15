import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
        username: createUserDto.username,
      },
    });
    if (existUser) {
      throw new BadRequestException('This email already exists');
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);

    const user = await this.userRepository.save({
      password: hash,
      username: createUserDto.username,
      email: createUserDto.email,
    });
    return { user };
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async remove(userId: string) {
    return userId;
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    return { userId, updateUserDto };
  }

  async getAll() {
    const allUser = await this.userRepository.find();

    return { allUser };
  }
}
