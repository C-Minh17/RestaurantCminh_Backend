import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum TypeVoucher {
  NUMBER = "NUMBER",
  PERCENT = "PERCENT",
}

@Entity("vouchers")
export class Voucher {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({ type: "enum", enum: TypeVoucher })
  type: TypeVoucher;

  @Column()
  value: number;

  @Column()
  min_order: number;

  @Column()
  max_uses: number;

  @Column({ default: 0 })
  used_count: number;

  @Column()
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}