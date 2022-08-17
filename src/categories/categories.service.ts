import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './categories.dto';
import { Category } from './categories.entity';
import { CategoriesRepository } from './categories.repository';
import { ProductDto } from '../products/products.dto';
import { ProductsRepository } from '../products/products.repository';
import { ProductsService } from '../products/products.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private categoriesRepository: CategoriesRepository,
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.categoriesRepository.getCategories();
  }

  getRootsCategories(): Promise<Category[]> {
    return this.categoriesRepository.find({ parentId: null });
  }

  addCategory(newCategory: CreateCategoryDto): Promise<Category> {
    return this.categoriesRepository.save(newCategory);
  }

  async getProductByCateogrySlug(slug: string): Promise<ProductDto[]> {
    const category = await this.categoriesRepository.findOne({
      where: { slug },
    });
    const products = await this.productsRepository.getProductsByCategory(
      category.id,
    );
    return ProductsService.mapArrayToProductDto(products);
  }
}
