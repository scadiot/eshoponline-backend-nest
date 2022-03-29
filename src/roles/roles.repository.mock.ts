import { Role } from './roles.entity';

export class RolesRepositoryMock {
  roles = [
    {
      id: 1,
      description: 'Application administration',
      name: 'Administrator',
      tag: 'admin',
    },
  ];

  async findByIds(ids: number[]): Promise<Role[]> {
    return this.roles.filter((r) => ids.includes(r.id));
  }
}
