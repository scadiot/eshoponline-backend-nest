import { EntityRepository, Repository } from 'typeorm';
import { Product } from './products.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  private logger = new Logger('ProductsRepository');

  async getProducts(): Promise<Product[]> {
    return await this.find();
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    try {
      return this.createQueryBuilder('product')
        .innerJoin(
          'product.categories',
          'category',
          'category.id = :categoryId',
          { categoryId },
        )
        .getMany();
    } catch (error) {
      this.logger.error(`Failed to get product`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getProductBySlug(slug: string): Promise<Product> {
    const query = this.createQueryBuilder('product');
    query.where('product.slug = :slug', { slug });
    //query.leftJoinAndSelect('product.categories', 'categories')

    try {
      const product = await query.getOne();
      return product;
    } catch (error) {
      this.logger.error(`Failed to get product`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
