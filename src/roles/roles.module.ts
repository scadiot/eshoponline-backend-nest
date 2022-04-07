import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesApiController } from './roles.api.controller';
import { RolesRepository } from './roles.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RolesRepository])],
  providers: [RolesService],
  controllers: [RolesApiController],
  exports: [RolesService],
})
export class RolesModule {}
