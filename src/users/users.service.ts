import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async findByMail(email: string): Promise<User | undefined> {
    return this.usersRepository.getUserByMail(email);
  }

  async create(user: User): Promise<User> {
    await this.usersRepository.save(user);
    return user;
  }
}
