import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: "phone can't be left blank" })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: "password can't be left blank" })
  password: string;
}