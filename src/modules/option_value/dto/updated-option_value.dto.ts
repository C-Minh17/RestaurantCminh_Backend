import { PartialType } from "@nestjs/swagger";
import { CreatedOptionValueDto } from "./created-option_value.dto";

export class updatedOptionValueDto extends PartialType(CreatedOptionValueDto) { }