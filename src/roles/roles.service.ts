import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesRepository } from './roles.repository';
import { Role } from './roles.entity';

@Injectable()
export class RolesService implements OnModuleInit {
  roles: Role[];

  constructor(
    @InjectRepository(RolesRepository)
    private rolesRepository: RolesRepository,
  ) {}

  async onModuleInit() {
    const roles = await this.rolesRepository.find();
    if (!roles.some((r) => r.tag === 'admin')) {
      this.rolesRepository.save({
        description: 'Application administration',
        name: 'Administrator',
        tag: 'admin',
      });
      console.log('Admin role added');
    }
    this.roles = await this.rolesRepository.find();
  }

  getRoles(): Role[] {
    return this.roles;
  }

  getRoleByTag(tag: string): Role | undefined {
    return this.roles.find((r) => r.tag === tag);
  }
}
