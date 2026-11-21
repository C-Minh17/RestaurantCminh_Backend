import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatedCategoryDto } from './dto/created-category.dto';
import { UpdatedCategoryDto } from './dto/updated-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

  async createCategory(data: CreatedCategoryDto) {
    const check = await this.categoryRepository.findOne({
      where: {
        name: data.name,
      }
    })

    if (check) {
      throw new ConflictException("name already exists");
    }

    const newCategory = await this.categoryRepository.create(data)
    return this.categoryRepository.save(newCategory)
  }

  async getAllCategory() {
    const data = await this.categoryRepository.find();
    return data;
  }

  async getCategoryById(id: string) {
    const data = await this.categoryRepository.findOne({
      where: { id }
    })

    if (!data) {
      throw new NotFoundException("category not found");
    }

    return data;
  }

  async updateCategory(data: UpdatedCategoryDto, id: string) {
    const dataUpdate = await this.categoryRepository.findOne({
      where: { id }
    })

    if (!dataUpdate) {
      throw new NotFoundException("category not found")
    }

    const check = await this.categoryRepository.findOne({
      where: {
        name: data.name,
      }
    })
    if (check) {
      throw new ConflictException("name already exists");
    }

    Object.assign(dataUpdate, data);
    return await this.categoryRepository.save(dataUpdate);
  }

  async deleteCategory(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id }
    })

    if (!category) {
      throw new NotFoundException("category not found")
    }

    await this.categoryRepository.remove(category);
    return {
      message: "Delete success"
    }
  }
}
