import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TypeVoucher } from "../entities/voucher.entity";

export class CreatedVoucherDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsEnum(TypeVoucher, { message: "type invalid" })
  @IsNotEmpty()
  type: TypeVoucher;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsNumber()
  @IsNotEmpty()
  min_order: number;

  @IsNumber()
  @IsNotEmpty()
  max_uses: number;

  @IsBoolean()
  is_active: boolean;



}