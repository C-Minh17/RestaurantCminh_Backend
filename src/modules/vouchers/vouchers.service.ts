import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeVoucher, Voucher } from './entities/voucher.entity';
import { CreatedVoucherDto } from './dto/created-voucher.dto';
import { UpdatedVoucherDto } from './dto/updated-voucher.dto';

@Injectable()
export class VouchersService {
  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>,
  ) { }

  async getAllVoucher() {
    const voucher = await this.voucherRepository.find();
    return voucher;
  }

  async getByIdVoucher(id: string) {
    const voucher = await this.voucherRepository.findOne({
      where: { id },
    });

    if (!voucher) {
      throw new NotFoundException("voucher not found");
    }
    return voucher;
  }

  async createVoucher(data: UpdatedVoucherDto) {
    if (data.type == TypeVoucher.PERCENT && data.value != undefined) {
      if (data.value > 100 || data.value <= 0) {
        throw new BadRequestException("value exceeds the limit")
      }
    }

    if (data.max_uses != undefined && data.max_uses < 0) {
      throw new BadRequestException("value invalid")
    }

    const voucher = await this.voucherRepository.create(data);
    return await this.voucherRepository.save(voucher);
  }

  async updateVoucher(id: string, data: UpdatedVoucherDto) {
    const voucher = await this.voucherRepository.findOne({
      where: { id },
    });

    if (!voucher) {
      throw new NotFoundException("voucher not found");
    }

    if (data.type == TypeVoucher.PERCENT && data.value != undefined) {
      if (data.value > 100 || data.value <= 0) {
        throw new BadRequestException("value exceeds the limit")
      }
    }

    if (data.max_uses != undefined && data.max_uses < 0) {
      throw new BadRequestException("value invalid")
    }

    Object.assign(voucher, data);
    return await this.voucherRepository.save(voucher);
  }

  async deleteVoucher(id: string) {
    const voucher = await this.voucherRepository.findOne({
      where: { id },
    });

    if (!voucher) {
      throw new NotFoundException("voucher not found");
    }
    await this.voucherRepository.remove(voucher);
    return {
      message: "delete success",
    };
  }

  async updateActiveVoucher(id: string) {
    const voucher = await this.voucherRepository.findOne({
      where: { id },
    });

    if (!voucher) {
      throw new NotFoundException("voucher not found");
    }

    voucher.is_active = !voucher.is_active;
    return await this.voucherRepository.save(voucher);
  }
}
