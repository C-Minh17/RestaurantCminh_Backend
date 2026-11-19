import { UserRole } from "../entities/user.entity";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEnum(UserRole, { message: "vai trò không hợp lệ" })
  @IsOptional()
  role?: UserRole;

  @IsString()
  @IsNotEmpty({ message: "Tên không được để trống" })
  full_name: string;

  @IsString()
  @IsNotEmpty({ message: "Số điện thoại không được để trống" })
  @MinLength(9, { message: "Số điện thoại không hợp lệ" })
  @MaxLength(12, { message: "Số điện thoại không hợp lệ" })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: "Email không được để trống" })
  email: string;

  @IsString()
  @IsNotEmpty({ message: "Mật Không được để trống" })
  password: string;


}