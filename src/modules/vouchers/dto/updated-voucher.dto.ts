import { PartialType } from "@nestjs/swagger";
import { CreatedVoucherDto } from "./created-voucher.dto";

export class UpdatedVoucherDto extends PartialType(CreatedVoucherDto) { }