import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { RolesRepository } from '../roles/roles.repository';
import { CreateUserDto, UpdateUserDto, UserDto } from './users.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @InjectRepository(RolesRepository)
    private rolesRepository: RolesRepository,
  ) {}

  async getAll(): Promise<UserDto[]> {
    return this.mapArrayToUserDto(await this.usersRepository.find());
  }

  async findByMail(email: string): Promise<UserDto | undefined> {
    const user = await this.usersRepository.getUserByMail(email);
    return user ? this.mapToUserDto(user) : undefined;
  }

  async validPassword(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.getUserByMail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const roles = await this.rolesRepository.findByIds(createUserDto.rolesIds);
    const userData = {
      email: createUserDto.email,
      password: createUserDto.password,
      roles,
    };
    const user = await this.usersRepository.save(userData);
    return this.mapToUserDto(user);
  }

  async update(updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOne(updateUserDto.id);
    user.roles = await this.rolesRepository.findByIds(updateUserDto.rolesIds);
    user.email = updateUserDto.email ? updateUserDto.email : user.email;
    user.password = updateUserDto.password
      ? updateUserDto.email
      : user.password;
    await this.usersRepository.save(user);
    return this.mapToUserDto(user);
  }

  async mapToUserDto(user: User): Promise<UserDto> {
    const userDto: UserDto = {
      id: user.id,
      email: user.email,
      rolesIds: user.roles ? user.roles.map((r) => r.id) : undefined,
    };
    return userDto;
  }

  async mapArrayToUserDto(users: User[]): Promise<UserDto[]> {
    return Promise.all(users.map((u) => this.mapToUserDto(u)));
  }
}
