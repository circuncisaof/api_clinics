import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from 'src/users/dtos/users.dto';
import { UserService } from 'src/users/user.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private auth_service: AuthService,
    private user_service: UserService,
  ) {}

  @Post('register')
  async auth_register(@Body() data: UserDto) {
    return this.user_service.register(data);
  }
  @Post('login')
  async auth_login(@Body() data: AuthDto) {
    return this.auth_service.auth_login(data);
  }
}
