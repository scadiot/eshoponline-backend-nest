import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.entity';
import { ProductDto } from './products.dto';
import { ApiCreatedResponse, ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiCreatedResponse({
    description: 'All products.',
    type: [Product],
  })
  @ApiQuery({
    name: 'category',
    required: false,
    type: String,
  })
  getProducts(@Query('category') categoryId?: number): Promise<Product[]> {
    return this.productsService.getProducts({
      categoryId: categoryId,
    });
  }

  @Get('slut/:slut')
  @ApiCreatedResponse({
    description: 'Product by slut.',
    type: ProductDto,
  })
  getProductBySlut(@Param('slut') slut: string): Promise<ProductDto> {
    return this.productsService.getProductBySlut(slut);
  }

  @Get('add')
  async addProducts(): Promise<string> {
    this.productsService.addProduct();
    return 'done';
  }
}
