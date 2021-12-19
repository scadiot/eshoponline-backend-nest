import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
  } from 'typeorm';

  import { Product } from '../products/products.entity'
  
  @Entity()
  export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column('varchar', { length: 200 })
    name: string;
  
    @Column('varchar', { length: 200 })
    slug: string;
  
    @Column('varchar', { length: 500 })
    description: string;
  
    @ManyToOne(type => Category, category => category.children)
    parent?: Category;

    @OneToMany(type => Category, category => category.parent)
    children: Category[];

    @ManyToMany(type => Product)
    @JoinTable({ name: 'products_categories' })
    products: Product[];
  }
  