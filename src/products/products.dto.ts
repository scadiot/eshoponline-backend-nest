import { ApiProperty } from '@nestjs/swagger';
import { Product } from './products.entity';

export class ProductDto extends Product {
  @ApiProperty()
  categoriesIds: number[];
}
