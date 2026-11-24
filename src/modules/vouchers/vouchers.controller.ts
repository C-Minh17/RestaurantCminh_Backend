import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { CreatedVoucherDto } from './dto/created-voucher.dto';
import { UpdatedVoucherDto } from './dto/updated-voucher.dto';
import { TransformResponseInterceptor } from 'src/common/interceptor/transform-response.interceptor';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorater';
import { UserRole } from '../user/entities/user.entity';

@UseInterceptors(TransformResponseInterceptor)
@Controller('vouchers')
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async getAll() {
    return await this.vouchersService.getAllVoucher();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get("/:id")
  async getById(@Param("id") id: string) {
    return await this.vouchersService.getByIdVoucher(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() data: CreatedVoucherDto) {
    return await this.vouchersService.createVoucher(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put()
  async update(@Body() data: UpdatedVoucherDto, @Param("id") id: string) {
    return await this.vouchersService.updateVoucher(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put("/active/:id")
  async updateActive(@Param("id") id: string) {
    return await this.vouchersService.updateActiveVoucher(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete("/:id")
  async del(@Param("id") id: string) {
    return await this.vouchersService.deleteVoucher(id);
  }
}
