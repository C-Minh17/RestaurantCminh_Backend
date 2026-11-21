import { PartialType } from "@nestjs/swagger";
import { CreatedMenuDto } from "./created-menu.dto";

export class UpdatedMenuDto extends PartialType(CreatedMenuDto) { }