import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';

import { Product } from '../products/products.entity';
import { User } from '../users/users.entity';

@Entity()
export class CartProducts {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  @JoinTable({ name: 'product' })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column('int', { nullable: true })
  productId: number;

  @ManyToOne(() => User)
  @JoinTable({ name: 'user' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('int')
  userId: number;

  @ApiProperty()
  @Column()
  count: number;
}
