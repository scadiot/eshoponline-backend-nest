import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Product } from '../products/products.entity';
import { User } from '../users/users.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title!: string;

  @Column('varchar', { length: 500 })
  comment: string;

  @Column('decimal', { precision: 5, scale: 2 })
  score: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => User)
  user: User;
}
