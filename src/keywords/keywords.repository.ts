import { EntityRepository, Repository } from 'typeorm';
import { Keyword } from './keywords.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Keyword)
export class KeywordsRepository extends Repository<Keyword> {
  async getAndCreateKeywords(words: string[]): Promise<Keyword[]> {
    return Promise.all(
      words.map(
        async (word) =>
          (await this.findOne({ where: { word } })) ??
          (await this.save({ word })),
      ),
    );
  }

  async getKeywordsByProduct(productId: number): Promise<Keyword[]> {
    const query = this.createQueryBuilder('k')
      .leftJoin('k.products', 'p')
      .andWhere('p.id = :productId', {
        productId,
      });

    return await query.getMany();
  }
}
