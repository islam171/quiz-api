import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(registerUserDto: RegisterUserDto) {
    return this.userService.create(registerUserDto);
  }
}
