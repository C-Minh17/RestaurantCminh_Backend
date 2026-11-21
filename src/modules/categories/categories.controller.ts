import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { TransformResponseInterceptor } from 'src/common/interceptor/transform-response.interceptor';
import { CreatedCategoryDto } from './dto/created-category.dto';
import { UpdatedCategoryDto } from './dto/updated-category.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorater';
import { UserRole } from '../user/entities/user.entity';

@UseInterceptors(TransformResponseInterceptor)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get()
  async getAllCategory() {
    return await this.categoriesService.getAllCategory()
  }

  @Get("/:id")
  async getCategoryById(@Param("id") id: string) {
    return await this.categoriesService.getCategoryById(id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async createCategory(@Body() data: CreatedCategoryDto) {
    return await this.categoriesService.createCategory(data)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put("/:id")
  async updateCategory(@Body() data: UpdatedCategoryDto, @Param("id") id: string) {
    return await this.categoriesService.updateCategory(data, id)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete("/:id")
  async deleteCategory(@Param("id") id: string) {
    return await this.categoriesService.deleteCategory(id)
  }

}
