import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto, UserDto } from './users.dto';
import { ApiCreatedResponse, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async addUsers(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    await this.usersService.create(user);
    user.password = undefined;
    return user;
  }
}
