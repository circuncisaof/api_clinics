import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePathUser } from './dtos/update_patch_users.dto';
import { UpdatePutUserDto } from './dtos/update_put_users.dto';
import { UserEntity } from './entities/user.entitie';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private user_repo: Repository<UserEntity>,
  ) {}

  all_user() {
    return this.user_repo.find();
  }

  async getUserId(id: string, email?: string): Promise<UserEntity> {
    const data_id = await this.user_repo.findOne({
      where: { id: id },
    });
    const data_email = await this.user_repo.findOne({
      where: {
        email: email,
      },
    });

    if(!data_id || !data_email) {
      
    }
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

  async info_user_existe(id: string, email?: string) {
    const info_data_if_exist = await this.getUserId(id);
    if (!info_data_if_exist) {
      return new BadRequestException('Não existe usuario');
    }
  }
}
