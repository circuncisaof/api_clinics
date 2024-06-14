import { ReturnUser } from 'src/users/dtos/returns/returns_users.dto';

export interface ReturnLogin {
  user: ReturnUser;
  accessToken: string;
}
