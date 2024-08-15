import { IsEmail, MinLength } from 'class-validator';

export class RegisterUserDto {
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  username: string;

  @MinLength(6, { message: 'Username must be at least 6 characters' })
  password: string;

  @IsEmail()
  email: string;
}
