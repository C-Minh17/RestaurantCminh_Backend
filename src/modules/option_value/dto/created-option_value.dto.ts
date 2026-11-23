import { IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreatedOptionValueDto {
  @IsString()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  menu_id: string;

  @IsArray()
  @IsString({ each: true })
  value: string[];

}