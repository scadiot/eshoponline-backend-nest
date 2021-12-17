import { Injectable } from '@nestjs/common';
import { Product } from './products.entity';
import { ProductsRepository } from './products.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
  ) {}

  async getProducts(): Promise<Product[]> {
    return this.productsRepository.getProducts();
    //return [
    //  {
    //    id: 'xxxxx',
    //    name: 'velo',
    //    slug: 'velo',
    //    summary: 'un joli velo',
    //    description: 'un velo vraiment très joli',
    //    createDate: new Date(),
    //    updateDate: new Date(),
    //  },
    //];
  }
}
