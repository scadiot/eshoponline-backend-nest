import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsApiController } from './reviews.api.controller';
import { ReviewsRepository } from './reviews.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewsRepository])],
  providers: [ReviewsService],
  controllers: [ReviewsApiController],
  exports: [ReviewsService],
})
export class RolesModule {}
