import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { Review } from './reviews.entity';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private rolesService: ReviewsService) {}
}
