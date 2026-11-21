import { Category } from "src/modules/categories/entities/category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("menu")
export class Menu {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: "uuid" })
  category_id: string;

  @ManyToOne(() => Category, (category) => category.menu, { onDelete: "SET NULL" })
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  price: number;

  @Column()
  image_url: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: "decimal", precision: 3, scale: 2, default: 0 })
  avg_rating: number;

  @Column({ default: 0 })
  rating_count: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}