import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from './entities/voucher.entity';

@Module({
  controllers: [VouchersController],
  providers: [VouchersService],
  imports: [TypeOrmModule.forFeature([Voucher])],
  exports: [VouchersService],
})
export class VouchersModule { }
