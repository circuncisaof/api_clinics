import { UserEntity } from 'src/users/entities/user.entitie';

export class ReturnUser {
  email: string;
  constructor(user_entity: UserEntity) {
    this.email = user_entity.email;
  }
}
