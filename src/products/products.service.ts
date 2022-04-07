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
    return ProductsService.mapArrayToProductDto(products);
  }

  async getProductById(id: number): Promise<ProductDto> {
    const product = await this.productsRepository.findOne({ id });
    product.categories = await this.categoriesRepository.getCategoriesByProduct(
      product.id,
    );
    product.keywords = await this.keywordsRepository.getKeywordsByProduct(
      product.id,
    );

    return ProductsService.mapToProductDto(product);
  }

  async getProductBySlug(slug: string): Promise<ProductDto> {
    const product = await this.productsRepository.getProductBySlug(slug);
    product.categories = await this.categoriesRepository.getCategoriesByProduct(
      product.id,
    );
    product.keywords = await this.keywordsRepository.getKeywordsByProduct(
      product.id,
    );

    return ProductsService.mapToProductDto(product);
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
    return ProductsService.mapToProductDto(product);
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
    return ProductsService.mapToProductDto(product);
  }

  static async mapToProductDto(product: Product): Promise<ProductDto> {
    const categories = product.categories
      ? product.categories.map((c) => c.id)
      : null;

    const keywords = product.keywords
      ? product.keywords.map((c) => c.word)
      : null;

    const productDto = {
      ...product,
      categories,
      keywords,
    };
    return productDto;
  }

  static async mapArrayToProductDto(
    products: Product[],
  ): Promise<ProductDto[]> {
    return Promise.all(products.map(async (p) => this.mapToProductDto(p)));
  }
}
