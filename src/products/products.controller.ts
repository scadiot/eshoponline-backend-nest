import {
  Controller,
  Get,
  Render,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiExcludeController } from '@nestjs/swagger';
import { ViewdataInterceptor } from '../viewdata.interceptor';

@ApiExcludeController()
@Controller('product')
@UseInterceptors(ViewdataInterceptor)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get(':slug')
  @Render('product')
  async getProduct(@Param('slug') slug: string) {
    const viewData = {
      product: await this.productsService.getProductBySlug(slug),
    };
    return viewData;
  }
}
