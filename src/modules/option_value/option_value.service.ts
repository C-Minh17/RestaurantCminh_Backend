import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionValue } from './entities/option_value.entity';
import { Repository } from 'typeorm';
import { CreatedOptionValueDto } from './dto/created-option_value.dto';
import { Menu } from '../menu/entities/menu.entity';
import { updatedOptionValueDto } from './dto/updated-option_value.dto';

@Injectable()
export class OptionValueService {
  constructor(
    @InjectRepository(OptionValue)
    private readonly optionValueRepository: Repository<OptionValue>,

    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>
  ) { }

  async getAll() {
    const op = await this.optionValueRepository.find();
    return op;
  }

  async getById(id: string) {
    const op = await this.optionValueRepository.findOne({
      where: { id },
    })

    if (!op) {
      throw new NotFoundException("OptionValue not found")
    }

    return op;
  }

  async createOptionValue(data: CreatedOptionValueDto) {
    const menu = await this.menuRepository.findOne({
      where: { id: data.menu_id }
    })
    if (!menu) {
      throw new Notification("menu not found")
    }
    const op = await this.optionValueRepository.create(data);

    return await this.optionValueRepository.save(op);

  }

  async updateOptionValue(data: updatedOptionValueDto, id: string) {
    const op = await this.menuRepository.findOne({
      where: { id }
    })
    if (!op) {
      throw new Notification("option not found")
    }

    const menu = await this.menuRepository.findOne({
      where: { id: data.menu_id }
    })
    if (!menu) {
      throw new Notification("menu not found")
    }

    Object.assign(op, data);
    return await this.optionValueRepository.save(op);
  }

  async deleteOptionValue(id: string) {
    const op = await this.optionValueRepository.findOne({
      where: { id },
    })

    if (!op) {
      throw new NotFoundException("OptionValue not found")
    }

    await this.optionValueRepository.remove(op);

    return {
      message: "delete success"
    };
  }

}
