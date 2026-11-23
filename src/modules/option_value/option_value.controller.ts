import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { OptionValueService } from './option_value.service';
import { TransformResponseInterceptor } from 'src/common/interceptor/transform-response.interceptor';
import { CreatedOptionValueDto } from './dto/created-option_value.dto';
import { updatedOptionValueDto } from './dto/updated-option_value.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorater';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRole } from '../user/entities/user.entity';

@UseInterceptors(TransformResponseInterceptor)
@Controller('option-value')
export class OptionValueController {
  constructor(private readonly optionValueService: OptionValueService) { }

  @Get()
  async getAll() {
    const data = await this.optionValueService.getAll();
    return data;
  }

  @Get("/:id")
  async getById(@Param() id: string) {
    const data = await this.optionValueService.getById(id);
    return data;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() data: CreatedOptionValueDto) {
    return await this.optionValueService.createOptionValue(data)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put("/id")
  async update(@Body() data: updatedOptionValueDto, @Param() id: string) {
    return await this.optionValueService.updateOptionValue(data, id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete("/id")
  async deleteOp(@Param() id: string) {
    return await this.optionValueService.deleteOptionValue(id);
  }
}
