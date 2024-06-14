import { UserEntity } from 'src/users/entities/user.entitie';

export class LoginPayload {
  id: string;
  name: string;
  email: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
