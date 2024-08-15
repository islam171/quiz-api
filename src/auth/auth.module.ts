import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  providers: [AuthService, LocalStrategy],
  imports: [PassportModule, UserModule],
  controllers: [AuthController],
})
export class AuthModule {}
