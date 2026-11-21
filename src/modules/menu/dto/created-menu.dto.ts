import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreatedMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsUUID()
  @IsNotEmpty()
  category_id: string;

  @IsString()
  image_url: string;

  @IsBoolean()
  is_active: boolean;

}