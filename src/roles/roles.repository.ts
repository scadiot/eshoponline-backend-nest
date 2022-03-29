import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Role } from './roles.entity';

@EntityRepository(Role)
export class RolesRepository extends Repository<Role> {}
