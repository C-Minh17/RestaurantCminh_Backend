import { Category } from "src/modules/categories/entities/category.entity";
import { OptionValue } from "src/modules/option_value/entities/option_value.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @OneToMany(() => OptionValue, (op) => op.menu)
  option_value: OptionValue[];

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