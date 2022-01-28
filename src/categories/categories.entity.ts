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

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 200 })
  name: string;

  @Column('varchar', { length: 200 })
  slug: string;

  @Column('varchar', { length: 500 })
  description: string;

  @ManyToOne((type) => Category, (category) => category.children)
  @JoinColumn({ name: 'parentId' })
  parent?: Category;

  @Column('varchar', { nullable: true })
  parentId: number;

  @OneToMany((type) => Category, (category) => category.parent)
  children: Category[];

  @ManyToMany(() => Product)
  @JoinTable({ name: 'products_categories' })
  products: Product[];
}
