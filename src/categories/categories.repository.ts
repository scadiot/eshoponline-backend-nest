import { EntityRepository, Repository } from 'typeorm';
import { Category } from './categories.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Product } from 'src/products/products.entity';

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {
  private logger = new Logger('CategoriesRepository');

  async getCategoriesByProduct(productId: number): Promise<Category[]> {
    const query = this.createQueryBuilder('c')
      .leftJoin('c.products', 'p')
      .andWhere('p.id = :productId', {
        productId,
      });

    return await query.getMany();
  }

  async getCategories(): Promise<Category[]> {
    const query = this.createQueryBuilder('c');

    return await query.getMany();
  }
}
