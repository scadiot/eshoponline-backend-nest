import { Module } from '@nestjs/common';
import { KeywordsRepository } from './keywords.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([KeywordsRepository])],
})
export class KeywordsModule {}
