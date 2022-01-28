import { Injectable } from '@nestjs/common';
import { Product } from './products.entity';
import { Category } from '../categories/categories.entity';
import { CategoriesRepository } from '../categories/categories.repository';
import { ProductsRepository } from './products.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './products.dto';

export interface getProductsOptions {
  categoryId?: number;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async getProducts(options: getProductsOptions): Promise<Product[]> {
    if (options.categoryId) {
      return this.productsRepository.getProductsByCategory(options.categoryId);
    } else {
      return this.productsRepository.getProducts();
    }
    //return [
    //  {
    //    id: 'xxxxx',
    //    name: 'velo',
    //    slug: 'velo',
    //    summary: 'un joli velo',
    //    description: 'un velo vraiment très joli',
    //    createDate: new Date(),
    //    updateDate: new Date(),
    //    categories: [
    //      { name: 'vélo', slug: 'velos', description: 'les vélos', }
    //    ]
    //  },
    //];
  }

  async getProductBySlut(slut: string): Promise<ProductDto> {
    const product = await this.productsRepository.getProductBySlug(slut);
    const categories = await this.categoriesRepository.getCategoriesByProduct(
      product.id,
    );

    return {
      ...product,
      categoriesIds: categories.map((c) => c.id),
    };
  }

  async addProduct(): Promise<void> {
    const categoryVehicle = new Category();
    categoryVehicle.name = 'Véhicules';
    categoryVehicle.description = 'Les machins qui roulent';
    categoryVehicle.slug = 'vehicules';
    await this.categoriesRepository.save(categoryVehicle);

    const categoryVelos = new Category();
    categoryVelos.name = 'Les vélos';
    categoryVelos.description = 'Les vélos';
    categoryVelos.slug = 'les_velo';
    categoryVelos.parent = categoryVehicle;
    await this.categoriesRepository.save(categoryVelos);

    const categoryMotos = new Category();
    categoryMotos.name = 'Les motos';
    categoryMotos.description = 'Les motos';
    categoryMotos.slug = 'les_motos';
    categoryMotos.parent = categoryVehicle;
    await this.categoriesRepository.save(categoryMotos);

    const newProduct = {
      name: 'velo',
      slug: 'velo',
      summary: 'un joli velo',
      description: 'un velo vraiment très joli',
      createDate: new Date(),
      updateDate: new Date(),
      categories: [categoryVehicle, categoryVelos],
    };
    await this.productsRepository.save(newProduct);

    const newProduct2 = {
      name: 'velo2',
      slug: 'velo2',
      summary: 'un joli velo2',
      description: 'un velo vraiment très joli2',
      createDate: new Date(),
      updateDate: new Date(),
      categories: [categoryVehicle, categoryVelos],
    };
    await this.productsRepository.save(newProduct2);

    const newProduct3 = {
      name: 'velo3',
      slug: 'velo3',
      summary: 'un joli velo3',
      description: 'un velo vraiment très joli3',
      createDate: new Date(),
      updateDate: new Date(),
      categories: [categoryVehicle],
    };
    await this.productsRepository.save(newProduct3);
  }
}
