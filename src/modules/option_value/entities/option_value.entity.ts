import { Menu } from "src/modules/menu/entities/menu.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("option_value")
export class OptionValue {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  menu_id: string;

  @ManyToOne(() => Menu, (menu) => menu.option_value, { onDelete: "SET NULL" })
  @JoinColumn({ name: "menu_id" })
  menu: Menu;


  @Column()
  name: string;

  @Column("text", { array: true, default: [] })
  value: string[];


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}