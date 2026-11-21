import { PartialType } from "@nestjs/swagger";
import { CreatedCategoryDto } from "./created-category.dto";

export class UpdatedCategoryDto extends PartialType(CreatedCategoryDto) { }