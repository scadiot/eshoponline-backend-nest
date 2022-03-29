import { EntityRepository, Repository } from 'typeorm';
import { Review } from './reviews.entity';

@EntityRepository(Review)
export class ReviewsRepository extends Repository<Review> {}
