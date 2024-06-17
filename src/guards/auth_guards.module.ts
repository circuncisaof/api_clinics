import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

export class Guard implements CanActivate {
  constructor(private readonly auth_service: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest().headers;
    try {
      console.log({ request });
      const data = this.auth_service.checkToken((request ?? '').split(' ')[1]);
      request.tokenPayload = data;
      return true;
    } catch (e) {
      return false;
    }
  }
}
