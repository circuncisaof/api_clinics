import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrt from 'bcrypt';
import { Repository } from 'typeorm';
import { ReturnUser } from './dtos/returns/returns_users.dto';
import { UpdatePathUser } from './dtos/update_patch_users.dto';
import { UpdatePutUserDto } from './dtos/update_put_users.dto';
import { UserDto } from './dtos/users.dto';
import { UserEntity } from './entities/user.entitie';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private user_repo: Repository<UserEntity>,
  ) {}

  async register(data: UserDto) {
    data.password = await this.convertPassBcrypt(data.password);
    await this.existUser(data.email);
    const user = await this.user_repo.create(data);

    return this.user_repo.save(user);
  }

  async all_user(): Promise<UserEntity[]> {
    return await this.user_repo.find();
  }

  async getUserId(id: string): Promise<ReturnUser> {
    return await this.user_repo.findOne({
      where: { id: id },
    });
  }

  async patch_user(id: string, data: UpdatePathUser) {
    return this.user_repo.update(id, data);
  }

  put_user(id: string, data: UpdatePutUserDto) {
    return this.user_repo.update(id, data);
  }

  delete_user(id: string) {
    return this.user_repo.delete(id);
  }

  async info_user_existe(id: string) {
    const info_data_if_exist = await this.getUserId(id);
    if (!info_data_if_exist) {
      return new BadRequestException('Não existe usuario');
    }
  }

  async convertPassBcrypt(pass: string) {
    const saltOrRounds = 10;

    return await bcrt.hash(pass, saltOrRounds);
  }

  async existUser(email: string) {
    const res = this.user_repo.exists({ where: { email } });
    if (!res) {
      throw new BadGatewayException('Email exist');
    }
  }
}
