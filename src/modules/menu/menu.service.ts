import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { CreatedMenuDto } from './dto/created-menu.dto';
import { UpdatedMenuDto } from './dto/updated-menu.dto';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  async getAllMenu() {
    const menu = await this.menuRepository.find({
      relations: {
        category: true,
        option_value: true,
      },
    });
    return menu;
  }

  async getMenuById(id: string) {
    const menu = await this.menuRepository.findOne({
      where: { id },
      relations: {
        category: true,
        option_value: true,
      }
    })

    if (!menu) {
      throw new NotFoundException("menu not found");
    }
    return menu;

  }

  async createMenu(data: CreatedMenuDto) {
    const menu = await this.menuRepository.create(data);
    return await this.menuRepository.save(menu);
  }

  async updateMenu(id: string, data: UpdatedMenuDto) {
    const menu = await this.menuRepository.findOne({
      where: { id },
    })

    if (!menu) {
      throw new NotFoundException("menu not found");
    }

    Object.assign(menu, data);
    return await this.menuRepository.save(menu);
  }

  async deleteMenu(id: string) {
    const menu = await this.menuRepository.findOne({
      where: { id },
    })

    if (!menu) {
      throw new NotFoundException("menu not found");
    }

    await this.menuRepository.remove(menu);

    return {
      message: "Delete success"
    }
  }

  async getMenuByCategory(categoryId: string) {
    const data = await this.categoryRepository.findOne({
      where: { id: categoryId }
    })

    if (!data) {
      throw new NotFoundException("category not found");
    }

    const menu = await this.menuRepository.find({
      where: {
        category_id: categoryId,
      },
      relations: {
        category: true,
        option_value: true,
      }
    })

    return menu;
  }

  async updateRatingMenu(id: string, rating: number) {
    const menu = await this.menuRepository.findOne({
      where: { id }
    })

    if (!menu) {
      throw new NotFoundException("menu not found")
    }

    const newAvg = (menu?.avg_rating * menu.rating_count + rating) / (menu.rating_count + 1);

    menu.avg_rating = Number(newAvg.toFixed(2));
    menu.rating_count = menu?.rating_count + 1;

    return await this.menuRepository.save(menu);
  }

  async updateActiveMenu(id: string) {
    const menu = await this.menuRepository.findOne({
      where: { id }
    })

    if (!menu) {
      throw new NotFoundException("menu not found")
    }

    menu.is_active = !menu.is_active;

    return await this.menuRepository.save(menu);
  }


}
