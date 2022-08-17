import {
  Controller,
  Get,
  Render,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiExcludeController } from '@nestjs/swagger';
import { ViewdataInterceptor } from '../viewdata/viewdata.interceptor';

@ApiExcludeController()
@Controller('category')
@UseInterceptors(ViewdataInterceptor)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get(':slug')
  @Render('category')
  async getProduct(@Param('slug') slug: string) {
    const viewData = {
      products: await this.categoriesService.getProductByCateogrySlug(slug),
    };
    return viewData;
  }
}
