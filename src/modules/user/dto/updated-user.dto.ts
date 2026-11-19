import { CreateUserDto } from "./created-user.dto";
import { PartialType } from '@nestjs/swagger';

export class updatedUserDto extends PartialType(CreateUserDto) { }