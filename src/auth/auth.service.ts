import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ReturnUser } from 'src/users/dtos/returns/returns_users.dto';
import { UserEntity } from 'src/users/entities/user.entitie';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { LoginPayload } from './dto/login-payload.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private auth_repo: Repository<UserEntity>,
  ) {}

  async auth_login({ email, password }: AuthDto) {
    console.log(`auth service ${email},${password}`);
    const user = await this.auth_repo.findOneBy({
      email,
    });

    const comparehash = bcrypt.compare(user.password, password);

    if (!user || !comparehash || (user && comparehash === null)) {
      throw new UnauthorizedException('Email or password incorrect');
    }
    return {
      accessToken: this.jwtService.sign({
        ...new LoginPayload(user),
      }),
      user: new ReturnUser(user),
    };
  }

  async checkToken(token: string) {
    return this.jwtService.verify(token, {
      audience: 'users',
      issuer: 'login',
    });
  }
}
