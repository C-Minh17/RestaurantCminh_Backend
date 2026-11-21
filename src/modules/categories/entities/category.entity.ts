import { Menu } from "src/modules/menu/entities/menu.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: 1 })
  sort_order: number

  @Column({ default: true })
  is_active: boolean;

  @OneToMany(() => Menu, (menu) => menu.category)
  menu: Menu[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}