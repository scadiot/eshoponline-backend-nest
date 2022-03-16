import { EntityRepository, Repository } from 'typeorm';
import { User } from './users.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async getUserByMail(email: string): Promise<User> {
    const query = this.createQueryBuilder('u').where('u.email = :email', {
      email,
    });
    return await query.getOne();
  }
}
