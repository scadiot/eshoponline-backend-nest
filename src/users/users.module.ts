import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersApiController } from './users.api.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesRepository } from '../roles/roles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, RolesRepository])],
  providers: [UsersService],
  controllers: [UsersApiController],
  exports: [UsersService],
})
export class UsersModule {}
