import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './categories.dto';
import { Category } from './categories.entity';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @ApiCreatedResponse({
    description: 'All categories.',
    type: [Category],
  })
  getCategories(): Promise<Category[]> {
    return this.categoriesService.getCategories();
  }

  @Post()
  addCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.addCategory(createCategoryDto);
  }
}
