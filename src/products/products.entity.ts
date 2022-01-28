import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Category } from '../categories/categories.entity';

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('varchar', { length: 200 })
  name: string;

  @ApiProperty()
  @Column('varchar', { length: 200 })
  slug: string;

  @ApiProperty()
  @Column('varchar', { length: 300 })
  summary: string;

  @ApiProperty()
  @Column('varchar', { length: 2000 })
  description: string;

  @ApiProperty()
  @CreateDateColumn()
  createDate: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updateDate: Date;

  @ManyToMany(() => Category)
  @JoinTable({ name: 'products_categories' })
  categories: Category[];
}
