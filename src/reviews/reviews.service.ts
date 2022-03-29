import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewsRepository } from './reviews.repository';
import { Review } from './reviews.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewsRepository)
    private reviewsRepository: ReviewsRepository,
  ) {}
}
