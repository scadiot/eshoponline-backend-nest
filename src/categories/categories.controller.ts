import { Controller, Get, Render, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('category')
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
