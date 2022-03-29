import { Injectable } from '@nestjs/common';
import { Product } from './products.entity';
import { CategoriesRepository } from '../categories/categories.repository';
import { KeywordsRepository } from '../keywords/keywords.repository';
import { ProductsRepository } from './products.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto, CreateProductDto } from './products.dto';

export interface getProductsOptions {
  categoryId?: number;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
    @InjectRepository(CategoriesRepository)
    private categoriesRepository: CategoriesRepository,
    @InjectRepository(KeywordsRepository)
    private keywordsRepository: KeywordsRepository,
  ) {}

  async getProducts(options: getProductsOptions): Promise<ProductDto[]> {
    let products;
    if (options.categoryId) {
      products = await this.productsRepository.getProductsByCategory(
        options.categoryId,
      );
    } else {
      products = await this.productsRepository.getProducts();
    }
    return this.mapArrayToProductDto(products);
  }

  async getProductBySlut(slut: string): Promise<ProductDto> {
    const product = await this.productsRepository.getProductBySlug(slut);
    product.categories = await this.categoriesRepository.getCategoriesByProduct(
      product.id,
    );

    return this.mapToProductDto(product);
  }

  async addProduct(productParam: CreateProductDto): Promise<ProductDto> {
    const categories = await this.categoriesRepository.findByIds(
      productParam.categories,
    );

    const keywords = await this.keywordsRepository.getAndCreateKeywords(
      productParam.keywords,
    );

    const newProduct = {
      ...productParam,
      createDate: new Date(),
      updateDate: new Date(),
      categories,
      keywords,
    };

    const product = await this.productsRepository.save(newProduct);
    return this.mapToProductDto(product);
  }

  async updateProduct(productParam: ProductDto): Promise<ProductDto> {
    const categories = await this.categoriesRepository
      .createQueryBuilder('cat')
      .where('cat.id IN (:...categories)', {
        categories: productParam.categories,
      })
      .select('cat.id')
      .getMany();

    const keywords = await this.keywordsRepository.getAndCreateKeywords(
      productParam.keywords,
    );

    const product: Product = {
      ...productParam,
      createDate: new Date(),
      updateDate: new Date(),
      categories,
      keywords,
    };

    await this.productsRepository.save(product);
    return this.mapToProductDto(product);
  }

  async mapToProductDto(product: Product): Promise<ProductDto> {
    const productDto = {
      ...product,
      categories: product.categories.map((c) => c.id),
      keywords: product.keywords.map((c) => c.word),
    };
    return productDto;
  }

  async mapArrayToProductDto(products: Product[]): Promise<ProductDto[]> {
    return Promise.all(products.map(async (p) => this.mapToProductDto(p)));
  }
}
