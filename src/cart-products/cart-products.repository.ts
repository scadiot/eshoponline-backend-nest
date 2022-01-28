import { EntityRepository, Repository } from 'typeorm';
import { CartProducts } from './cart-products.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Product } from 'src/products/products.entity';

@EntityRepository(CartProducts)
export class CartProductsRepository extends Repository<CartProducts> {
  private logger = new Logger('CartProductsRepository');

  async getCategoriesByProduct(productId: number): Promise<CartProducts[]> {
    const query = this.createQueryBuilder('c')
      .leftJoin('c.products', 'p')
      .andWhere('p.id = :productId', {
        productId,
      });

    return await query.getMany();
  }
}
