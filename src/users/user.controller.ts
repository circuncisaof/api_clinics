import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
} from '@nestjs/common';
import { UpdatePathUser } from './dtos/update_patch_users.dto';
import { UpdatePutUserDto } from './dtos/update_put_users.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private user_service: UserService) {}
  @Get()
  async get_all_user() {
    return this.user_service.all_user();
  }

  @Get(':id')
  async getUserId(@Param('id') id: string) {
    return this.user_service.getUserId(id);
  }

  @Patch(':id')
  async patch_user(@Param('id') id: string, @Body() data: UpdatePathUser) {
    return this.user_service.patch_user(id, data);
  }

  @Put(':id')
  async put_user(@Param('id') id: string, @Body() data: UpdatePutUserDto) {
    return this.user_service.put_user(id, data);
  }

  @Delete(':id')
  async delete_user(@Param('id') id: string) {
    return this.user_service.delete_user(id);
  }
}
