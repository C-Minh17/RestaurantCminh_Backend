import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Transform } from 'class-transformer';

export class CreatedCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  name: string;

  @IsNumber()
  sort_order: number;

  @IsBoolean()
  is_active: boolean;
}