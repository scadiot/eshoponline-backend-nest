import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { ProductDto } from './products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(): Promise<Product[]> {
    return this.productsService.getProducts();
  }

  @Get('slut/:slut')
  getProductBySlut(@Param('slut') slut: string): Promise<ProductDto> {
    return this.productsService.getProductBySlut(slut);
  }

  @Get('add')
  async addProducts(): Promise<string> {
    this.productsService.addProduct();
    return 'done';
  }
}
