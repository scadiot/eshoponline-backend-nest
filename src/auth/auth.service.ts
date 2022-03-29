import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    return await this.usersService.validPassword(email, password);
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      userId: user.id,
      roles: user.roles ? user.roles.map((r) => r.tag) : [],
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
